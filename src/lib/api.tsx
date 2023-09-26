export function getBnbURL(path = "") {
  return `${"https://airbnbnew.cybersoft.edu.vn/api"}${"/"}${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path: any) {
  const requestUrl = getBnbURL(path);
  try {
    const response = await fetch(requestUrl, {
      headers: {
        "Content-Type": "application/json",
        tokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MCIsIkhldEhhblN0cmluZyI6IjE4LzAxLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwNTUzNjAwMDAwMCIsIm5iZiI6MTY3NzQzMDgwMCwiZXhwIjoxNzA1NjgzNjAwfQ.s4X0R0Wi80X0f9MLJ2XYxRKJdQJBW27dwvkpfN03100`,
      },
      cache: 'no-store',
    },);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function postAPI(path: any, values: any, userToken: any) {
  let token = userToken ? userToken : "";
  const requestUrl = getBnbURL(path);
  try {
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
        tokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MCIsIkhldEhhblN0cmluZyI6IjE4LzAxLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwNTUzNjAwMDAwMCIsIm5iZiI6MTY3NzQzMDgwMCwiZXhwIjoxNzA1NjgzNjAwfQ.s4X0R0Wi80X0f9MLJ2XYxRKJdQJBW27dwvkpfN03100`,
      },
      body: values,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function updateAPI(path: any, values: any, userToken: any) {
  let token = userToken ? userToken : "";
  const requestUrl = getBnbURL(path);
  console.log(values);
  try {
    const response = await fetch(requestUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token,
        tokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MCIsIkhldEhhblN0cmluZyI6IjE4LzAxLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwNTUzNjAwMDAwMCIsIm5iZiI6MTY3NzQzMDgwMCwiZXhwIjoxNzA1NjgzNjAwfQ.s4X0R0Wi80X0f9MLJ2XYxRKJdQJBW27dwvkpfN03100`,
      },
      body: values,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

// export async function postImageAPI(path: any, values: any, userToken: any) {
//   let token = userToken ? userToken : "";
//   const requestUrl = getBnbURL(path);
//   try {
//     const param: any = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         token,
//         tokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MCIsIkhldEhhblN0cmluZyI6IjE4LzAxLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwNTUzNjAwMDAwMCIsIm5iZiI6MTY3NzQzMDgwMCwiZXhwIjoxNzA1NjgzNjAwfQ.s4X0R0Wi80X0f9MLJ2XYxRKJdQJBW27dwvkpfN03100`,
//       },
//       body: {
//         formFile: values,
//       },
//       // body: values,
//     };
//     console.log(param);
//     const response = await fetch(requestUrl, param);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     return error;
//   }
// }
