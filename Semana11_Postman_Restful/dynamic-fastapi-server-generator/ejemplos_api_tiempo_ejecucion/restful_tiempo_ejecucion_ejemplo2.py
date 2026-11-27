from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from prism import (
    ApiPrism,
    PrismConfig,
    DbClient,
    DbConfig,
    PoolConfig,
    ModelManager
)

# -----------------------------------------------------------------------------
# FastAPI
# -----------------------------------------------------------------------------

app = FastAPI(
    title="API Autogenerada",
    version="1.0.0",
    description="API REST generada automáticamente desde MySQL"
)

# -----------------------------------------------------------------------------
# CORS
# -----------------------------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React
        "http://localhost:5173",  # Vite
        "http://localhost:8080",  # Vue
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------------------------------------------
# MySQL
# -----------------------------------------------------------------------------

db_client = DbClient(
    config=DbConfig(
        db_type="mysql",
        driver_type="sync",
        database="fastapi_server",
        user="root",
        password="",
        host="localhost",
        port=3306,
        pool_config=PoolConfig(
            pool_size=10,
            max_overflow=20,
            pool_pre_ping=True
        )
    )
)

# -----------------------------------------------------------------------------
# Model Manager
# -----------------------------------------------------------------------------

model_manager = ModelManager(
    db_client=db_client,
    include_schemas=[]
)

# -----------------------------------------------------------------------------
# Prism
# -----------------------------------------------------------------------------

api_prism = ApiPrism(
    config=PrismConfig(
        project_name="MySQL Auto API",
        version="1.0.0",
        description="API generada automáticamente desde MySQL"
    ),
    app=app
)

api_prism.generate_all_routes(model_manager)

# -----------------------------------------------------------------------------
# Health Check
# -----------------------------------------------------------------------------

@app.get("/health")
def health():
    return {"status": "ok"}

# -----------------------------------------------------------------------------
# Ejecutar
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
    
#https://dev.to/yrrrrrf/your-database-is-your-api-auto-generate-a-fastapi-backend-in-seconds-2hip
#uvicorn main:app --reload