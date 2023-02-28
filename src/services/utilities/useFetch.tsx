import axios from "axios";
function useFetch() {
  async function getFetch(url: string) {
    let res;
    try {
      const response = await axios
        .get(url)
        .then(function (response) {
          res = response;
        })
        .catch(function (error) {
          console.log(error?.data);
          res = error;
        });
    } catch (e) {
      return null;
    }
    return res;
  }
  /////
  async function patchFetch(url, body?, header = {}) {
    let res;
    try {
      const response = await axios
        .patch(url, body, {
          headers: header,
        })
        .then(function (response) {
          res = response;
        })
        .catch(function (error) {
          console.log(error?.data);
          res = error;
        });
    } catch (e) {
      return null;
    }
    return res;
  }
  ////
  async function postFetch(url, body?, header = {}) {
    let res;
    try {
      const response = await axios
        .post(url, body, {
          headers: header,
        })
        .then(function (response) {
          res = response;
        })
        .catch(function (error) {
          console.log(error?.data);
          res = error;
        });
    } catch (e) {
      return null;
    }
    return res;
  }

  return [getFetch, postFetch, patchFetch];
}
export default useFetch;
