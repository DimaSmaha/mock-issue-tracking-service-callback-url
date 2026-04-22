# curl endpoint checks

These examples use `cmd.exe`-friendly `curl` syntax.

## /bugs

GET success:

```cmd
curl --location http://localhost:3000/bugs/114
```

GET unsuccess:

```cmd
curl --location http://localhost:3000/bugs/999
```

POST success:

```cmd
curl --location http://localhost:3000/bugs/create --header "Content-Type: application/json" --data-raw "{\"title\":\"Login issue\",\"description\":\"Login button stays disabled after valid input\",\"type\":\"bug\"}"
```

POST unsuccess wrong body:

```cmd
curl --location http://localhost:3000/bugs/create --header "Content-Type: application/json" --data-raw "{\"key\":\"value\"}"
```

POST unsuccess no application/json:

```cmd
curl --location http://localhost:3000/bugs/create --data-raw "{\"title\":\"Login issue\",\"description\":\"Login button stays disabled after valid input\",\"type\":\"bug\"}"
```

---

## /tasks

GET success:

```cmd
curl --location http://localhost:3000/tasks/112
```

GET unsuccess:

```cmd
curl --location http://localhost:3000/tasks/999
```

POST success:

```cmd
curl --location http://localhost:3000/tasks/create --header "Content-Type: application/json" --data-raw "{\"title\":\"Imported task\",\"description\":\"Create a task received from an external callback\",\"type\":\"story\"}"
```

POST unsuccess wrong body:

```cmd
curl --location http://localhost:3000/tasks/create --header "Content-Type: application/json" --data-raw "{\"key\":\"value\"}"
```

POST unsuccess no application/json:

```cmd
curl --location http://localhost:3000/tasks/create --data-raw "{\"title\":\"Imported task\",\"description\":\"Create a task received from an external callback\",\"type\":\"story\"}"
```

---

## /testcases

GET success:

```cmd
curl --location http://localhost:3000/testcases/115
```

GET unsuccess:

```cmd
curl --location http://localhost:3000/testcases/999
```

POST success:

```cmd
curl --location http://localhost:3000/testcases/create --header "Content-Type: application/json" --data-raw "{\"title\":\"Verify login flow\",\"type\":\"testcase\",\"steps\":[\"Open the sign-in page\",\"Enter valid credentials\",\"Click Login\",\"Verify the dashboard is displayed\"]}"
```

POST unsuccess wrong body:

```cmd
curl --location http://localhost:3000/testcases/create --header "Content-Type: application/json" --data-raw "{\"key\":\"value\"}"
```

POST unsuccess no application/json:

```cmd
curl --location http://localhost:3000/testcases/create --data-raw "{\"title\":\"Verify login flow\",\"type\":\"testcase\",\"steps\":[\"Open the sign-in page\",\"Enter valid credentials\",\"Click Login\",\"Verify the dashboard is displayed\"]}"
```
