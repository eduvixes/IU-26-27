
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


    
# ============================================================================
# MODEL Clases
# ============================================================================

class Clases(BaseModel):
    nameClase: str
    profesorClase: str
    fechaClase: date
    horaClase: time
    inicioClase: datetime


@app.get("/clases")
def get_all_clases():

    with engine.connect() as conn:

        rows = conn.execute(text("SELECT * FROM clases")).mappings().all()

    return [dict(row) for row in rows]


@app.get("/clases/{id}")
def get_clases(id: int):

    with engine.connect() as conn:

        row = conn.execute(text("SELECT * FROM clases WHERE id=:id"), {"id": id}).mappings().first()

    if not row:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    return dict(row)


@app.post("/clases")
def create_clases(item: Clases):

    values = item.dict()
    
    print("Valores a insertar:", values)

    with engine.begin() as conn:

        result = conn.execute(text("INSERT INTO clases (nameClase,profesorClase,fechaClase,horaClase,inicioClase) VALUES (:nameClase,:profesorClase,:fechaClase,:horaClase,:inicioClase)"), values)

    return {"success": True, "id": result.lastrowid}


@app.put("/clases/{id}")
def update_clases(id: int, item: Clases):

    values = item.dict()
    
    print("Valores a actualizar:", values)

    with engine.begin() as conn:
        
        # dictionary unpacking, note the ** before values to unpack the dictionary into keyword arguments, necessary due to the id parameter being passed separately
        result = conn.execute(text("UPDATE clases SET nameClase=:nameClase,profesorClase=:profesorClase,fechaClase=:fechaClase,horaClase=:horaClase,inicioClase=:inicioClase WHERE id=:id"), {"id": id, **values}) 

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    return {"success": True, "updated": True}


@app.delete("/clases/{id}")
def delete_clases(id: int):

    with engine.begin() as conn:

        result = conn.execute(text("DELETE FROM clases WHERE id=:id"),{"id": id})

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    return {"success": True, "deleted": True}


    
# ============================================================================
# MODEL Documentos
# ============================================================================

class Documentos(BaseModel):
    nameDoc: str
    numPaginasDoc: int
    tipoDoc: str
    publicadoDoc: int
    autorId: int


@app.get("/documentos")
def get_all_documentos():

    with engine.connect() as conn:

        rows = conn.execute(text("SELECT * FROM documentos")).mappings().all()

    return [dict(row) for row in rows]


@app.get("/documentos/{id}")
def get_documentos(id: int):

    with engine.connect() as conn:

        row = conn.execute(text("SELECT * FROM documentos WHERE id=:id"), {"id": id}).mappings().first()

    if not row:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    return dict(row)


@app.post("/documentos")
def create_documentos(item: Documentos):

    values = item.dict()
    
    print("Valores a insertar:", values)

    with engine.begin() as conn:

        result = conn.execute(text("INSERT INTO documentos (nameDoc,numPaginasDoc,tipoDoc,publicadoDoc,autorId) VALUES (:nameDoc,:numPaginasDoc,:tipoDoc,:publicadoDoc,:autorId)"), values)

    return {"success": True, "id": result.lastrowid}


@app.put("/documentos/{id}")
def update_documentos(id: int, item: Documentos):

    values = item.dict()
    
    print("Valores a actualizar:", values)

    with engine.begin() as conn:
        
        # dictionary unpacking, note the ** before values to unpack the dictionary into keyword arguments, necessary due to the id parameter being passed separately
        result = conn.execute(text("UPDATE documentos SET nameDoc=:nameDoc,numPaginasDoc=:numPaginasDoc,tipoDoc=:tipoDoc,publicadoDoc=:publicadoDoc,autorId=:autorId WHERE id=:id"), {"id": id, **values}) 

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    return {"success": True, "updated": True}


@app.delete("/documentos/{id}")
def delete_documentos(id: int):

    with engine.begin() as conn:

        result = conn.execute(text("DELETE FROM documentos WHERE id=:id"),{"id": id})

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    return {"success": True, "deleted": True}


    
# ============================================================================
# MODEL Users
# ============================================================================

class Users(BaseModel):
    nameUser: str
    emailUser: str


@app.get("/users")
def get_all_users():

    with engine.connect() as conn:

        rows = conn.execute(text("SELECT * FROM users")).mappings().all()

    return [dict(row) for row in rows]


@app.get("/users/{id}")
def get_users(id: int):

    with engine.connect() as conn:

        row = conn.execute(text("SELECT * FROM users WHERE id=:id"), {"id": id}).mappings().first()

    if not row:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    return dict(row)


@app.post("/users")
def create_users(item: Users):

    values = item.dict()
    
    print("Valores a insertar:", values)

    with engine.begin() as conn:

        result = conn.execute(text("INSERT INTO users (nameUser,emailUser) VALUES (:nameUser,:emailUser)"), values)

    return {"success": True, "id": result.lastrowid}


@app.put("/users/{id}")
def update_users(id: int, item: Users):

    values = item.dict()
    
    print("Valores a actualizar:", values)

    with engine.begin() as conn:
        
        # dictionary unpacking, note the ** before values to unpack the dictionary into keyword arguments, necessary due to the id parameter being passed separately
        result = conn.execute(text("UPDATE users SET nameUser=:nameUser,emailUser=:emailUser WHERE id=:id"), {"id": id, **values}) 

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    return {"success": True, "updated": True}


@app.delete("/users/{id}")
def delete_users(id: int):

    with engine.begin() as conn:

        result = conn.execute(text("DELETE FROM users WHERE id=:id"),{"id": id})

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    return {"success": True, "deleted": True}

