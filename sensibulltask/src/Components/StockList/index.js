import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Styles } from './styles';
import BasicTable from './table';
import TextField from '@mui/material/TextField';


function StockList(props) {

    const [header, setHeader] = useState({});
    const [stockList, setStockList] = useState([]);
    const [stockList1,setStockList1] = useState([]);
    const [search,setSearch] = useState('');

    const getStockData = async () => {

        let API = "https://prototype.sbulltech.com/api/v2/instruments";
        axios.get(API)
            .then(res => {

                let csvResponse = res.data;
                var array = csvResponse.toString().split("\n");
                var data = []
                for (const r of array) {
                    let row = r.toString().split(",")
                    data.push(row)
                }
                console.log(data);

                var heading = data[0];

                // console.log(heading); to get the column headers which will act as key
                var ans = [];
                for (var i = 1; i < data.length; i++) {
                    var row = data[i]
                    var obj = {}
                    for (var j = 0; j < heading.length; j++) {
                        if (!row[j]) {
                            row[j] = "NA";
                        }

                        obj[heading[j].replaceAll(" ", "_")] = row[j].toString().replaceAll(" ", "_")
                    }
                    ans.push(obj);
                }

                setStockList(ans);
                setStockList1(ans);

            })
            .then(err => console.log('err', err));


    }

    console.log('stockList', stockList);

    useEffect(() => {
        getStockData();
    }, []);

    const handleSearch = (event) => {
        debugger;
        let search = event.target.value !=="" ? (event.target.value).toString().toLowerCase() : "";
        let arr = [...stockList1];
        setSearch(search);
        if(search !== "") {
            arr = arr.filter(ele =>  ((ele.Symbol).toLowerCase()).includes(search) || ((ele.Name).toLowerCase()).includes(search));
            setStockList(arr);
        }
        else {
          setStockList(stockList1);
        }
        

    }


    return (
        <div>
            <div style={Styles.heading}>
                <div>
                    Stock List
                </div>
                <div>
                    <TextField
                        id="outlined-name"
                        label="Search"
                        type='text'
                        value={search}
                        style={{width:'300px', height:'20px'}}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div style={Styles.base}>
                <BasicTable stockList={stockList} />
            </div>

        </div>
    );
}

export default StockList;