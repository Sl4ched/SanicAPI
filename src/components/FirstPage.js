import './style.css'
import {useState} from "react";

export default function FirstPage(props) {


    const [wholeData, setWholeData] = useState(props.wholeData)

    const [age, setAge] = useState()
    const [name, setName] = useState()
    const [surname, setSurname] = useState()

    const [isOk, setIsOk] = useState(true)

    const createDeleteRequest = (id) => {

        if (isOk) {

            setIsOk(false)

            const url = new URL(`http://localhost:8080/delete/${id}`)

            fetch(url, {method: "DELETE"})
                .then(response => response.json())
                .then(result => {

                    const url = new URL(`http://localhost:8080/get`)

                    fetch(url)
                        .then(response => response.json())
                        .then(result => {
                            setWholeData(result)

                            setIsOk(true)
                        })

                })
        }

    }

    const changeListener = (event) => {


        switch (event.target.name) {
            case "age":
                setAge(event.target.value)
                break
            case "name":
                setName(event.target.value)

                break
            case "surname":
                setSurname(event.target.value)

                break
            default:
                break

        }

    }

    return <div>

        <div className={"border-double border-4 border-pink-500 m-9"}>

            <label className="block m-8">
            <span
                className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Age
            </span>
                <input type="number" name="age"
                       className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-pink-400 focus:ring-pink-400 block w-full rounded-md sm:text-sm focus:ring-1"
                       placeholder="Age"
                       onChange={changeListener}/>
            </label>

            <label className="block m-8">
            <span
                className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Name
            </span>
                <input type="text" name="name"
                       className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-pink-400 focus:ring-pink-400 block w-full rounded-md sm:text-sm focus:ring-1"
                       placeholder="Name"
                       onChange={changeListener}/>
            </label>

            <label className="block m-8">
            <span
                className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Surname
            </span>
                <input type="text" name="surname"
                       className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-pink-400 focus:ring-pink-400 block w-full rounded-md sm:text-sm focus:ring-1"
                       placeholder="Surname"
                       onChange={changeListener}/>
            </label>

        </div>

        <div className={"flex justify-center"}>
            <button
                onClick={() => {

                    const url = new URL("http://localhost:8080/post")

                    fetch(url, {

                        method: 'POST',
                        body: JSON.stringify({
                            Age: age,
                            Name: name,
                            Surname: surname
                        })

                    })
                        .then(response => response.json())
                        .then(result => {

                            const url = new URL(`http://localhost:8080/get`)

                            fetch(url)
                                .then(response => response.json())
                                .then(result => setWholeData(result))

                        })

                }}
                className="rounded bg-pink-500 hover:bg-pink-600 active:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300 p-2">Add
                new contact
            </button>
        </div>

        <div>
            {wholeData.map(e => {

                return <div
                    className={"m-9 p-3 flex flex-row justify-between items-center border-double border-4 border-pink-500"}>
                    <div className={"flex flex-col"}>
                        <div>Age is:{e.Age}</div>
                        <div>Name is: {e.Name}</div>
                        <div>Surname is: {e.Surname}</div>
                        <div>ID: {e._id}</div>
                    </div>

                    <div onClick={() => createDeleteRequest(e._id)}
                         className={"mr-7 text-red-700 font-bold text-2xl cursor-pointer"}>X
                    </div>
                </div>

            })}
        </div>


    </div>
}

