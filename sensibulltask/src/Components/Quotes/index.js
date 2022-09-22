import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Styles } from '../StockList/styles';
import BasicTable from './table';
import { useLocation } from "react-router-dom";
import moment, { calendarFormat } from 'moment';



function Quotes() {
    const location = useLocation();
    const { state: { Symbol = "" } } = location;

    const [quotesList, setQuotesList] = useState([]);
    const [expireTime, setExpireTime] = useState(null);
    const [expire,setIsExpire] = useState(null);
    let time = null;
    // const [counter,setCounter] = useState();

    let timer;
    const getQuotes = () => {
        let Api = `https://prototype.sbulltech.com/api/v2/quotes/${Symbol}`;

        axios.get(Api).then(res => {
            if (res.status === 200) {
                let data = res.data && res.data.payload;
                let list = data[Symbol];
                // setIsExpire(true);
                list.sort((a, b) => (new Date(b.time)).valueOf() - (new Date(a.time)).valueOf());
                clearInterval(timer);
                setQuotesList(list);
                setIsExpire(true);
            }
        }).catch(err => console.log('err', err));

    }

    useEffect(() => {
        getQuotes();
    }, []);

    useEffect(() => {
            timer = setInterval(() => {
                getQuotes();
             },(10000));
      

    },[expire]);

   


 



    return (
        <div>
            <div style={Styles.heading}>
                <div>
                    Quotes List of {Symbol}
                </div>

            </div>
            <div style={Styles.base}>
                <BasicTable quotesList={quotesList} />
            </div>

        </div>
    );
}

export default Quotes;