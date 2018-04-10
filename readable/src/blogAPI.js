const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const get = (path) =>
  fetch(`${api}/`+path, { headers })
    .then(res => res.json())
    .then(data => data)


export const post = (path, body) =>
  fetch(`${api}/`+path, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const put = (path, body) =>
  fetch(`${api}/`+path, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const del = (path) =>
  fetch(`${api}/`+path, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    })
    .then(res => res.json())
    .then(data => data)



