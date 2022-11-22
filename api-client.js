const baseUrl = "http://localhost:3000/";

const getData = async function () {
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    });
    const resJSON = await response.json();
    console.log(resJSON);
    return resJSON;
  } catch (error) {
    console.log(error);
  }
};

const postToDoItem = async function () {
  const data = { description: `${this.value}`, done: false };
  console.log(this.value);
  try {
    await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const changeToDoItem = async function (text, id) {
  const data = { description: `${text}` };
  try {
    await fetch(baseUrl + `${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const checkToDoItem = async function (id) {
  const data = { done: true };
  try {
    await fetch(baseUrl + `${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const unCheckToDoItem = async function (id) {
  const data = { done: false };
  try {
    await fetch(baseUrl + `${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteToDoItem = async function (id) {
  try {
    await fetch(baseUrl + `${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};
export {
  getData,
  postToDoItem,
  changeToDoItem,
  checkToDoItem,
  unCheckToDoItem,
  deleteToDoItem,
};
