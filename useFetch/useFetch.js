import { useEffect, useState } from "react"

export const useFetch = ( url ) => {

    const [state, setstate] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
    })

    useEffect(() => {

        getFetch();

    }, [ url ]); // cuando el url cambie se vuelve a realizar esta petición http Fetch  se pone el estado loadin de nuevo
  
    const setLoadingState = () => {
        setstate({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
        })
    }

    const getFetch = async () => {


        setLoadingState();
        const resp = await fetch( url );

        //  sleep
         await new Promise((resolve, reject) => setTimeout( resolve, 1500) );


        //  si no hay una respuesta
        if ( !resp.ok ) {
            setstate({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText,
                }
            });
            return;
        }

        const data = await resp.json(); console.log( data);
        // extraer el json que viene del servidor
        setstate({
            data: data,
            isLoading: false,
            hasError: false,
            error: null,
        })

        // manejo del caché
    }

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
        // error: state.error
    }
}