import datetime

from sanic import Sanic
from sanic_motor import BaseModel, ObjectId
from sanic.response import text, json

from sanic_cors import CORS  # cross-origin this is using for fetch data from different ports

app = Sanic("Test")

conf_dict = {

    "MOTOR_URI": "",
    "LOGO": None

}

app.update_config(conf_dict)
BaseModel.init_app(app)
CORS(app)


class MyModel(BaseModel):
    __coll__ = 'tests'


@app.get('/get')
async def index(request):
    query_dict = dict(request.query_args)
    if len(query_dict) == 0:
        sort_by = ""
    else:
        if query_dict.keys().__contains__("sort_by"):
            sort_by = query_dict['sort_by']
        else:
            sort_by = ""
    whole_data = await MyModel.find(as_raw=True, sort=sort_by)
    return json(whole_data.objects)


@app.delete('/delete/<_id>')
async def delete(request, _id):
    if (data := await MyModel.find_one({"_id": _id}, as_raw=True)) is not None:
        await MyModel.delete_one({"_id": _id})
        return json({"deleted": True, "deletedValue": data}, status=200)
    else:
        return json({"deleted": False}, status=304)


@app.post('/post')
async def post(request):
    last_json = dict(request.json)

    if len(last_json["Age"]) != 0 and len(last_json["Name"]) != 0 and len(last_json["Surname"]) != 0:

        created_object_id = str(ObjectId())
        last_json["_id"] = created_object_id

        await MyModel.insert_one(last_json)

        return json({"Post Completed": True}, status=200)
    else:
        return json({"Post completed": False})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True, auto_reload=True)
