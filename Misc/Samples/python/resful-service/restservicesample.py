from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class Employees(Resource):
    def get(self):
        return {'employees': [{'id':1, 'name':'Balram'},{'id':2, 'name':'Tom'}]} 

    def post(self):
api.add_resource(Employees, '/employees') # Route_1

if __name__ == '__main__':
    app.run(host="192.168.3.167", port=5002)