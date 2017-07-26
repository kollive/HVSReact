import * as _ from 'lodash'

export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    }
}

export function itemDeleteData(item) {
    return (dispatch, getState) => {
        debugger;
        const { items } = getState();
        const newitems = items.filter(( itm ) =>  itm.gs_pr_name !== item.gs_pr_name);       
        dispatch(itemsFetchDataSuccess(newitems))
    };
}



export function itemUpdateData(item) {
    return (dispatch, getState) => {
    //return (dispatch) => {
        /*
        dispatch({
            type: 'ITEM_UPDATE',
            //items,
            item
        });
        */
        debugger;
        const { items } = getState();
        const newitems = items.map((itm,index) => {
                if(_.trim(itm.gs_pr_name) !== _.trim(item.gs_pr_name)) {
                    return itm;
                } else {
                     var newItem = {                    
                        ...itm,
                        gs_pr_name :"kolli"
                        //...action.item
                    }
                    return  newItem;
                }
        })
        dispatch(itemsFetchDataSuccess(newitems))
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        debugger;
        //fetch(url)
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: 'ttuso',
                password: 'ttuso',
            })
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            dispatch(itemsIsLoading(false));
            return response;
        })
            .then((response) => {
                debugger;
                let v = response.json();
                //console.log(v);
                return v;
            })
            .then((items) => dispatch(itemsFetchDataSuccess(JSON.parse(items).result)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}




export function updateRowData(rowData) {
    return {
        type: 'ROW_DATA_CHANGED',
        rowData
    }
}

export function updateRowSelection(rowSelection) {
    return {
        type: 'ROW_SELECTION_CHANGED',
        rowSelection
    }
}