import React, {useEffect, useState} from 'react'
import {Container, Select, InputLabel, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab';

import { useNavigatorOnline } from '@oieduardorabelo/use-navigator-online';

import Logo from '../assets/logo-27.png'
import './style.css'

const axios = require("axios");

export default function Serach() {

    //Listas
    const [listBrand, setListBrand] = useState([]); 
    const [listModel, setListModel] = useState([]); 
    const [listYear, setListYaer] = useState([]); 
    const [price, setPrice] = useState([]);


    //Codigos

    const [codBrand, setCodBrand] = useState(); 
    const [codModel, setCodModel] = useState(); 


    //Esconder dados

    const [hModel, setHModel] = useState(true)
    const [hYear, setHYear] = useState(true)
    const [hPrice,setHPrice] = useState(true)

    useEffect(() => {
        async function search(){
            await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas')
            .then(response => {setListBrand(response.data)})}
            
            search()
    }, [])



    async function handleBrand(cod){
        setCodBrand(cod)
        await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${cod}/modelos`)
        .then(res => {setListModel(res.data.modelos)})
        .catch(console.log("Error handleBrand"))
        setHModel(false)

    }
    async function handleModel(cod){
        setCodModel(cod)
        await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codBrand}/modelos/${cod}/anos`)
        .then(res => {setListYaer(res.data)})
        .catch(console.log("Error handleModel"))
        setHYear(false)

    }

    async function handleYear(cod){
        await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codBrand}/modelos/${codModel}/anos/${cod}`)
        .then(res => {setPrice(res.data)})
        .catch(console.log("Error handleYear"))
        setHPrice(false)
    }

  
    let { status } = useNavigatorOnline({
        whenOffline: <Alert className="alert"  variant="filled" severity="error">Você esta offline, alguns recursos não vão funcionar corretamente</Alert  >,
      });

    return (
        <>
        <header>
            <img src={Logo} alt=""/>
            
        </header>
        
        <Container 
        display="flex" 
        maxWidth="sm"
        justifyContent="center"
        alignItems="center"
        className="container"
        
        >
            {status}
               <Grid container
                direction="column"
                justify="center"
                alignItems="flex-start"
                
                
                >
            <div className="brand">
                <InputLabel htmlFor="filled-age-native-simple" >Marcas</InputLabel>
                <Select
                onChange={e =>{handleBrand(e.target.value)}} 
                native 
                inputProps={{
                 name: 'brand',
                 }}>
                    {listBrand.map(i =>{
                        return(
                            <option value={i.codigo} key={i.codigo}>{i.nome}</option>
                        )
                    })}

                </Select>
            </div>
            <div className="model" hidden={hModel}>
                <InputLabel htmlFor="filled-age-native-simple">Modelo</InputLabel>
                    <Select native onChange={e =>{handleModel(e.target.value)}}>
                        {listModel.map(i =>{
                            return(
                                <option value={i.codigo} key={i.codigo}>{i.nome}</option>
                            )
                        })}

                    </Select>
            </div>
            <div className="model" hidden={hYear}>
             <InputLabel htmlFor="filled-age-native-simple">Ano</InputLabel>
                    <Select native onChange={e =>{handleYear(e.target.value)}}>
                        {listYear.map(i =>{
                            return(
                                <option value={i.codigo} key={i.codigo}>{i.nome}</option>
                            )
                        })}

                    </Select>
                    <div className="price" hidden={hPrice}>
                        
                            <Typography variant="h6" component="h1">{price.Valor}</Typography>
                        
                        
                    </div>
            </div>
            </Grid>

        </Container>
     </>
    )
}
