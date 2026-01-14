import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProduct } from "../store/action";

const useProductFilter=()=>{

    const [searchParams]=useSearchParams();
    const dispatch=useDispatch();

    useEffect(()=>{

        const params=new URLSearchParams();
        const currentPage=searchParams.get("page")?Number(searchParams.get("page")):1;
       
        params.set("pageNumber",currentPage-1);

        const sortOrder=searchParams.get("sortBy")||"asc";
        const categoryParams=searchParams.get("category")||null;
        const keyword=searchParams.get('keyword')||null;
        params.set("sortBy","price");
        params.set("sortOrder",sortOrder);

        if(categoryParams){
            params.set("category",categoryParams);
        }
        if(keyword){
            params.set("keyword",keyword);
        }
        const querystring=params.toString();
        console.log(querystring);
        dispatch(fetchProduct(querystring));

    },[searchParams,dispatch])

}

export default useProductFilter;