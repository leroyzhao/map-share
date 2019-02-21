import axios from "axios";

let marks = [
  {
    id: 1,
    restaurantName: "Jam3 Toronto",
    address: "101 testing road",
    review: "testing review bla bla bla bla",
    priceRange: "$$",
    img: "https://cdn-images-1.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png",
    rating: "4.5",
    position: { lat: 43.6472857, lng: -79.3925776 }
  },
  {
    id: 2,
    restaurantName: "Your position",
    address: "101 testing road",
    review: "testing review bla bla bla bla",
    priceRange: "$$",
    img: "https://cdn-images-1.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png",
    rating: "3.67",
    position: { lat: 43.6425662, lng: -79.3892455 }
  }
];

export const addMarker = bool => {
  return {
    type: "ADD_MARKER",
    showModal: bool
  };
};

export const marksHasError = bool => {
  return {
    type: "MARKS_HAS_ERRORED",
    hasErrored: bool
  };
};

export const marksIsLoading = bool => {
  return {
    type: "MARKS_IS_LOADING",
    isLoading: bool
  };
};

export const marksFetchDataSuccess = marks => {
  return {
    type: "MARKS_FETCH_DATA_SUCCESS",
    marks: marks
  };
};

export const marksFetchData = url => {
  return dispatch => {
    dispatch(marksFetchDataSuccess(marks));
  };
};

export const saveMark = data => {
  console.log(data);
  let num = marks.length;
  let test = { id: num + 1, img: "https://cdn-images-1.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png", ...data };

  return (dispatch, getState) => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", test)
      .then(res => dispatch(marksFetchDataSuccess([...marks, res.data])));
  };
};
