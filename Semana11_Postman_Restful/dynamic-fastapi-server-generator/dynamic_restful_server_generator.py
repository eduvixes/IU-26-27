from sqlalchemy import create_engine, MetaData, text
from pathlib import Path

# database url can be modified, depending on what the user is employing
# example for postgresql: DATABASE_URL = "postgresql+psycopg2://username:password@localhost/database_name"
DATABASE_URL = "mysql+pymysql://root:@localhost/fastapi_server"

engine = create_engine(DATABASE_URL)

metadata = MetaData()
metadata.reflect(bind=engine)

#print (text)

code = '''
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, text
from datetime import date, time, datetime, timedelta


# database url can be modified, depending on what the user is employing
# example for postgresql: DATABASE_URL = "postgresql+psycopg2://username:password@localhost/database_name"
DATABASE_URL = "mysql+pymysql://root:@localhost/fastapi_server"

engine = create_engine(DATABASE_URL)

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

# these urls can by modified, pointing to the url of the Client API
origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],    
)

def timedelta_to_time(td: timedelta) -> time:
    total_seconds = int(td.total_seconds())

    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    seconds = total_seconds % 60

    return time(hours, minutes, seconds)

'''

for table in metadata.tables.values():
    
    #print(table)
    #print(table.name)
    #print(table.columns)

    model_name = "".join(
        word.capitalize()
        for word in table.name.split("_")
    )

    fields = []
    insert_columns = []
    insert_params = []
    update_columns = []

    for column in table.columns:
        
        #print(column)
        #print(column.name)
        #print(column.type)

        if column.name == "id":
            continue

        col_type = str(column.type).lower()

        if "int" in col_type:
            py_type = "int"
        elif any(x in col_type for x in ["float", "double", "decimal", "numeric"]):
            py_type = "float"
        elif "bool" in col_type:
            py_type = "bool"
        elif "datetime" in col_type or "timestamp" in col_type:
            py_type = "datetime"
        elif "date" in col_type:
            py_type = "date"
        elif "time" in col_type:
            py_type = "time"
        else:
            py_type = "str"

        #print(f"Columna: {column.name}, Tipo SQL: {col_type}, Tipo Python: {py_type}")
        
        fields.append(f"    {column.name}: {py_type}")

        insert_columns.append(column.name)

        insert_params.append(f":{column.name}")

        update_columns.append(f"{column.name}=:{column.name}")

    fields_code = "\n".join(fields)

    insert_cols_sql = ",".join(insert_columns)

    insert_params_sql = ",".join(insert_params)

    update_sql = ",".join(update_columns)

    code += f'''
    
# ============================================================================
# MODEL {model_name}
# ============================================================================

class {model_name}(BaseModel):
{fields_code}


@app.get("/{table.name}")
def get_all_{table.name}():

    with engine.connect() as conn:

        rows = conn.execute(text("SELECT * FROM {table.name}")).mappings().all()

    return [dict(row) for row in rows]


@app.get("/{table.name}/{{id}}")
def get_{table.name}(id: int):

    with engine.connect() as conn:

        row = conn.execute(text("SELECT * FROM {table.name} WHERE id=:id"), {{"id": id}}).mappings().first()

    if not row:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    return dict(row)


@app.post("/{table.name}")
def create_{table.name}(item: {model_name}):

    values = item.dict()
    
    print("Valores a insertar:", values)

    with engine.begin() as conn:

        result = conn.execute(text("INSERT INTO {table.name} ({insert_cols_sql}) VALUES ({insert_params_sql})"), values)

    return {{"success": True, "id": result.lastrowid}}


@app.put("/{table.name}/{{id}}")
def update_{table.name}(id: int, item: {model_name}):

    values = item.dict()
    
    print("Valores a actualizar:", values)

    with engine.begin() as conn:
        
        # dictionary unpacking, note the ** before values to unpack the dictionary into keyword arguments, necessary due to the id parameter being passed separately
        result = conn.execute(text("UPDATE {table.name} SET {update_sql} WHERE id=:id"), {{"id": id, **values}}) 

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    return {{"success": True, "updated": True}}


@app.delete("/{table.name}/{{id}}")
def delete_{table.name}(id: int):

    with engine.begin() as conn:

        result = conn.execute(text("DELETE FROM {table.name} WHERE id=:id"),{{"id": id}})

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    return {{"success": True, "deleted": True}}

'''

Path("main.py").write_text(code, encoding="utf-8")

print("main.py generado correctamente")