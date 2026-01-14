import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginations=({numberOfPage,totalProducts})=>{

    const [searchParams]=useSearchParams();
    const pathname=useLocation().pathname;
    const params= new URLSearchParams(searchParams);
    const navigate=useNavigate();

    const paramValue=searchParams.get("pageNumber") ? Number(searchParams.get("pageNumber")):1;

    const handlechange=(event,value)=>{
      params.set("page",value.toString());
      navigate(`${pathname}?${params}`);
    }


    return(
        <Pagination count={numberOfPage}  variant="outlined" color="primary" siblingCount={1} boundaryCount={2} 
        onChange={handlechange}/>
    );



}

export default Paginations;