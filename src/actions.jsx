export const fetchDataRequest = () =>({
 type: "FETCH_DATA_LOADING"
});

export const fetchDataSuccess = (data) =>({
    type: "FETCH_DATA_SUCCESS",
    payload: data
});

export const fetchDataFailure = (error) =>({
type: "FETCH_DATA_FAILURE",
error,
})


export const fetchData = () => {
    return async (dispatch) => {
      dispatch(fetchDataRequest());
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        const data = await response.json();
        dispatch(fetchDataSuccess(data));
      } catch (error) {
        dispatch(fetchDataFailure(error.message));
      }
    };
  };