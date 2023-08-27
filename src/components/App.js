import FirstPage from './FirstPage'
import LoadingPage from './LoadingPage'
import {useEffect, useState} from "react";

export default function App() {

    const [data, setData] = useState([])

    useEffect(() => {

        const url = new URL("http://localhost:8080/get?sort_by=Surname")

        fetch(url, {
            method: "GET"
        })
            .then(response => response.json())
            .then(result => {
                let dataT = result.map(element => element)
                setData(dataT)
            })
    }, []);


    return <div>
        {data.length === 0 ? <LoadingPage/> : <FirstPage wholeData={data}/>}
    </div>

}


