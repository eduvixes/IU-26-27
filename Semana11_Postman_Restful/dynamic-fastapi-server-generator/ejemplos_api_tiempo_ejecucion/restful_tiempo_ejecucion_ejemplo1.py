from fastapi import FastAPI
from prism import ApiPrism, DbClient
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Autogenerada")
db_client = DbClient(db_url="mysql+pymysql://root:@localhost/fastapi_server")

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

api_prism = ApiPrism(db_client=db_client, app=app)
api_prism.generate_all_routes()

#https://dev.to/yrrrrrf/your-database-is-your-api-auto-generate-a-fastapi-backend-in-seconds-2hip
#uvicorn main:app --reload