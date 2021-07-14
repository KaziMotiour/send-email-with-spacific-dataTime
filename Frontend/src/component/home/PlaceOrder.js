import React,{useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

import { Button, Form,Col } from 'react-bootstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux'
import { useHistory, withRouter, NavLink } from "react-router-dom";
import {MerchentList} from '../../store/actions/Auth'
import {PlaceNewOrder} from '../../store/actions/Order'
import NavBar from '../../component/NavBar'
import SnackBer from './SnackBer'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    form:{
        width:'35%',
        margin:'auto',
    },
    showCalculatedValue:{
        marginTop:50,
        marginBottom:100,
        width:'90%',
        margin:'auto'
    }
    
    

    }))


function PlaceOrder() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.auth.loggedinUserInfo)
    const [calculated, setCalculated] = useState(false)
    const [Nullname, setNullName] = useState(false)
    // const [Nullname, setNullName] = useState(false)
    const [percelType, setPercelType] = useState('Fragile')
    const [weightType, setWightType] = useState('KG')
    const [merchent, setMerchent] = useState({
        id:'',
        full_name:'Select Merchant'
    })
    const [percelDetail, setPercelDetail] = useState({
        percelName:'',
        weight:'0',
        address:''
    })
    const [weightError, setWeightError] = useState(false)
    const [lessWeightError, setLessWeightError] = useState(false)
    const [maxWeightError, setMaxWeightError] = useState(false)
    const [finalCalculation, setFinalCalculation] = useState({
        marchant_id:'',
        marchant_name:'',
        percel_name:'',
        percel_type:'',
        weight:'',
        weight_unit:'',
        cost:'',
        cod_charge:'',
        return_charge:'',
        total_cost:'',
        return_cost:'',
        Location:''
    })
    const {marchant_id, marchant_name, percel_name, percel_type, weight,weight_unit,cost, cod_charge, return_charge, total_cost, Location , return_cost} = finalCalculation


    const [are, setArea] = useState('Select area')
    




    const merchentList = useSelector(state => state.auth.merchentList)
    const orderPlacedSuccess = useSelector(state => state.order.orderCreateSuccess)
    console.log(orderPlacedSuccess,'successs placed order');
    
    console.log(merchentList,'merchent list');

    const config = { headers: { 
        'Content-Type':'application/json',
        'Authorization': "Bearer " + localStorage.getItem('access_token')
      }}


    useEffect(() => {
        dispatch(MerchentList(config))
    }, [])



    const handleSelectPercelType = (e) => {
        setPercelType(e)
    }

    const handleSelectWeightType = (e) =>{

        setWightType(e)
    }

    const handleSelectMerchent = (e) =>{
        console.log(e.split(' '));
        let x = e.split(' ')
        setMerchent(prev =>({
            ...prev,
            id:x[0],
            full_name:x[1]+' '+x[2]
        }))
    }
    const handleSelectArea = (e) =>{
        setArea(e)
    }

    const handleChangeInput = (e) =>{
        setPercelDetail(prev =>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const claculateTotalConst = (e) =>{
        e.preventDefault()
        let gm5To2kg = 0
        let kg3 = 0
        let kg4 = 0
        let kg5 = 0
        let cod_charge = 0
        let return_charge = 0 
        const weight = parseInt(percelDetail.weight)
        

        if (weight.toString() === 'NaN'){
            setWeightError(true)
            setLessWeightError(false)
        }else if(weight<500 && weightType==='GM'){
            setWeightError(false)
            setLessWeightError(true)
            console.log('wight');
        }else{
            setWeightError(false)
            setLessWeightError(false)
        
            if(are==='Inside of Dhaka' ){
                gm5To2kg = 60
                kg3 = 70
                kg4 = 80
                kg5 = 90

                let cod_charge = 0
                let return_charge = 0
                let cost = 0
                let total_cost = 0
                let return_cost = 0
                if (weight>500 && weightType==='GM' || weight<=2 && weightType==='KG'){
                    cost = gm5To2kg
                    total_cost = gm5To2kg
                    setMaxWeightError(false)
                }else if(weight===3 && weightType==='KG'){
                    cost = kg3
                    total_cost=kg3
                    setMaxWeightError(false)
                }else if(weight===4 && weightType==='KG'){
                    cost = kg4
                    total_cost=kg4
                    setMaxWeightError(false)
                }else if(weight===5 && weightType==='KG'){
                    cost = kg5
                    total_cost=kg5
                    setMaxWeightError(false)
                }else if(weight >=5 && weightType==='KG'){
                    setMaxWeightError(true)
                }

                console.log(total_cost, cod_charge, return_charge, return_cost);
                setFinalCalculation({
                    marchant_id:merchent.id ? merchent.id:'',
                    marchant_name:merchent.full_name ? merchent.full_name: '',
                    percel_name:percelDetail.percelName ? percelDetail.percelName:'',
                    percel_type:percelType,
                    weight:weight,
                    weight_unit:weightType,
                    cost:cost,
                    cod_charge:cod_charge+'%',
                    return_charge:return_charge+'%',
                    total_cost:total_cost,
                    return_cost:return_cost,
                    Location:percelDetail.address
                })
                setCalculated(true)
                
            }else if(are==='Division of Dhaka'){
                gm5To2kg = 110
                kg3 = 130
                kg4 = 150
                kg5 = 170

                let cod_charge = 1
                let return_charge = 50
                let cost = 0
                let total_cost = 0
                let return_cost = 0
                if (weight>500 && weightType==='GM' || weight<=2 && weightType==='KG'){
                    cost = gm5To2kg
                    total_cost = gm5To2kg + (gm5To2kg*.01)
                    return_cost = gm5To2kg*.50
                    setMaxWeightError(false)
                }else if(weight===3 && weightType==='KG'){
                    cost = kg3
                    total_cost = kg3 + (kg3*.01)
                    return_cost = kg3*.50
                    setMaxWeightError(false)
                }else if(weight===4 && weightType==='KG'){
                    cost = kg4
                    total_cost = kg4 + (kg4*.01)
                    return_cost = kg4*.50
                    setMaxWeightError(false)
                }else if(weight===5 && weightType==='KG'){
                    cost = kg5
                    total_cost = kg5 + (kg5*.01)
                    return_cost = kg5*.50
                    setMaxWeightError(false)
                }else if(weight >=5 && weightType==='KG'){
                    setMaxWeightError(true)
                }

                console.log(total_cost, cod_charge, return_charge, return_cost);
                setFinalCalculation({
                    marchant_id:merchent.id ? merchent.id:'',
                    marchant_name:merchent.full_name ? merchent.full_name: '',
                    percel_name:percelDetail.percelName ? percelDetail.percelName:'',
                    percel_type:percelType,
                    weight:weight,
                    weight_unit:weightType,
                    cost:cost,
                    cod_charge:cod_charge+'%',
                    return_charge:return_charge+'%',
                    total_cost:total_cost,
                    return_cost:return_cost,
                    Location:percelDetail.address
                })
                setCalculated(true)
                
            }else if(are==='Outside of Dhaka'){
                gm5To2kg = 130
                kg3 = 150
                kg4 = 170
                kg5 = 190

                let cod_charge = 1
                let return_charge = 50
                let cost = 0
                let total_cost = 0
                let return_cost = 0
                if (weight>500 && weightType==='GM' || weight<=2 && weightType==='KG'){
                    cost = gm5To2kg
                    total_cost = gm5To2kg + (gm5To2kg*.01)
                    return_cost = gm5To2kg*.50
                    setMaxWeightError(false)
                }else if(weight===3 && weightType==='KG'){
                    cost = kg3
                    total_cost = kg3 + (kg3*.01)
                    return_cost = kg3*.50
                    setMaxWeightError(false)
                }else if(weight===4 && weightType==='KG'){
                    cost = kg4
                    total_cost = kg4 + (kg4*.01)
                    return_cost = kg4*.50
                    setMaxWeightError(false)
                }else if(weight===5 && weightType==='KG'){
                    cost = kg5
                    total_cost = kg5 + (kg5*.01)
                    return_cost = kg5*.50
                    setMaxWeightError(false)
                }else if(weight >=5 && weightType==='KG'){
                    setMaxWeightError(true)
                }

                console.log(total_cost, cod_charge, return_charge, return_cost);
                setFinalCalculation({
                    marchant_id:merchent.id ? merchent.id:'',
                    marchant_name:merchent.full_name ? merchent.full_name: '',
                    percel_name:percelDetail.percelName ? percelDetail.percelName:'',
                    percel_type:percelType,
                    weight:weight,
                    weight_unit:weightType,
                    cost:cost,
                    cod_charge:cod_charge+'%',
                    return_charge:return_charge+'%',
                    total_cost:total_cost,
                    return_cost:return_cost,
                    Location:percelDetail.address
                })
                setCalculated(true)
                
            }

        }        
        
    }
    // marchant_id, marchant_name, percel_name, percel_type, weight,weight_unit,cost, cod_charge, return_charge, total_cost, Location , return_cost
    const PlaceOrder = () =>{
        const formData = new FormData()
        formData.append("marchant", marchant_id)
        formData.append("percel_name", percel_name)
        formData.append("percel_type", percel_type)
        formData.append("weight", weight)
        formData.append("weight_unit", weight_unit)
        formData.append("cost", cost)
        formData.append("cod_charge", cod_charge)
        formData.append("return_charge", return_charge)
        formData.append("return_cost", return_cost)
        formData.append("total_cost", total_cost)
        formData.append("Location", Location)
        
        dispatch(PlaceNewOrder(formData, config))
    }
    console.log(finalCalculation);
    return (
        <div className={classes.root}>
             <div className={classes.nav}>
                <NavBar userInfo={userInfo} />
            </div>

            <p style={{textAlign:'center', marginTop:20, marginBottom:30, fontSize:40, borderBottom:'1px solid black', width:'auto'}}>PLACE A NEW ORDER</p>
            
            
            <div className={classes.form}>

            <Form>
                {/* percel name and type */}
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label >Percel Name</Form.Label>
                  <Form.Control name='percelName' type="text" placeholder="Percel Name" value={percelDetail.percelName}  onChange={handleChangeInput}/>
                </Form.Group>

                <Form.Group as={Col} style={{width:'100px'}} controlId="formGridPassword">
                  <p style={{marginLeft:'-60%',}}>Percel Type </p>
                  <DropdownButton
                    alignRight
                    title={percelType}
                    id="dropdown-menu-align-right"
                    onSelect={handleSelectPercelType}
                    variant="info"
                    style={{width:'100px', marginTop:'-10px'}}
                >
              <Dropdown.Item eventKey="Fragile">Fragile</Dropdown.Item>
              <Dropdown.Item eventKey="Liquid">Liquid</Dropdown.Item>
             
            </DropdownButton>

                </Form.Group>
               
               
                </Form.Row>

                {/* percel weight and kg or gm */}
                <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label >Weight</Form.Label>
                  <Form.Control name='weight' type="text" placeholder="Percel Weight" value={percelDetail.weight}  onChange={handleChangeInput} />
                  {weightError && <span style={{color:'red'}}>Please Provide number not String</span>}
                  {lessWeightError && <span style={{color:'red'}}>Cannot percel less then 500 gm</span>}
                  {maxWeightError  && <span style={{color:'red'}}>Cannot percel more the 5kg</span>}
                </Form.Group>

                <Form.Group as={Col} style={{width:'100px'}}                         controlId="formGridPassword">
                  <p style={{marginLeft:'-70%',}}> Unit </p>
                    <DropdownButton
                        alignRight
                        title={weightType}
                        id="dropdown-menu-align-righ"
                        onSelect={handleSelectWeightType}
                        variant="info"
                        style={{width:'100px', marginTop:'-10px'}}
                    >
                    <Dropdown.Item eventKey="KG">KG</Dropdown.Item>
                    <Dropdown.Item eventKey="GM">GM</Dropdown.Item>
             
                </DropdownButton>

                </Form.Group>
                </Form.Row>


                {/* Merchent Type */}
                <Form.Row>  
                <Form.Group as={Col} style={{width:'100px'}}                         controlId="formGridPassword">
                  <p style={{marginLeft:'-50%',}}> Select Merchant </p>
                    <DropdownButton
                        alignRight
                        title={merchent.full_name}
                        id="dropdown-menu-align-righ"
                        onSelect={handleSelectMerchent}
                        variant="info"
                        style={{width:'100px', marginTop:'-10px'}}
                    >
                        {merchentList && merchentList.map(merchents =>(
                            <Dropdown.Item 
                            eventKey={merchents.id +' '+ merchents.first_name+' '+ merchents.last_name} 
                            >
                                {merchents.id+' '+ merchents.first_name} {merchents.last_name}
                            </Dropdown.Item>
                        ))}
                   
             
                </DropdownButton>

                </Form.Group>
                <Form.Group as={Col} style={{width:'100px'}}                         controlId="formGridPassword">
                  <p style={{marginLeft:'-60%',}}>Select Area </p>
                    <DropdownButton
                        alignRight
                        title={are}
                        id="dropdown-menu-align-righ"
                        onSelect={handleSelectArea}
                        variant="info"
                        style={{width:'100px', marginTop:'-10px'}}
                    >
                    <Dropdown.Item eventKey="Inside of Dhaka">Inside of Dhaka</Dropdown.Item>
                    <Dropdown.Item eventKey="Division of Dhaka"> Division of Dhaka</Dropdown.Item>
                    <Dropdown.Item eventKey="Outside of Dhaka"> Outside of Dhaka </Dropdown.Item>
             
                </DropdownButton>

                </Form.Group>


                </Form.Row>



                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control name="address" placeholder="Address" value={percelDetail.address}  onChange={handleChangeInput} />
                </Form.Group>

                <p style={{color:'blue'}}>Fillup the form with Select box before Click on Calculate</p>
                <Button variant="primary" onClick={claculateTotalConst} type="submit">
                  Calculate Total Cost
                </Button>
                </Form>

             </div>

        
            <div>
            



            </div>

            <div className={classes.showCalculatedValue}>
            {calculated && 
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Percel Name</TableCell>
                      <TableCell>Percel Type</TableCell>
                      <TableCell align="center">Location</TableCell>
                      <TableCell align="center">marchant Infor</TableCell>
                      <TableCell align="center">weight</TableCell>
                      <TableCell align="center">cost</TableCell>
                      <TableCell align="center">COD charge</TableCell>
                      
                      <TableCell align="center">Total Cost</TableCell>

                      <span style={{borderLeft:'1px solid black'}}>
                      <TableCell align="center">Return Cost Will be {return_charge}</TableCell>
                      </span>
                    </TableRow>
                  </TableHead>

                {/* for merchant */}
                  
                  <TableBody>
                      
                         
                      <TableRow>
                        <TableCell component="th" scope="row">
                        {percel_name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                        {percel_type}
                        </TableCell>
                        <TableCell align="center">{Location}</TableCell>
                        <TableCell align="center">{marchant_name}</TableCell>
                        <TableCell align="center">{weight} {weight_unit} </TableCell>
                        <TableCell align="center">{cost}</TableCell>
                       
                        <TableCell align="center">{cod_charge}</TableCell>
                        <TableCell align="center">{total_cost} Tk</TableCell>
                        <span >
                        <TableCell align="center"> {return_cost} Tk</TableCell>
                        </span>

                        
                      </TableRow>
                      
                
                  </TableBody>

                

                </Table>
            </TableContainer>
            }
                {calculated &&  <Button variant="primary" style={{marginTop:20,}} onClick={PlaceOrder} type="submit">
                  Place New Order
                </Button>}
            </div>
            {orderPlacedSuccess==true && <SnackBer open={true} orderPlacedSuccess={orderPlacedSuccess} /> }
            
        </div>
    )
}

export default PlaceOrder
