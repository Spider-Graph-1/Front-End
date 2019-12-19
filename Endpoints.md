# Endpoints

## /register
[POST] register
```typescript
type RequestData = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
} 
```

## /login
[POST] login
```typescript
type RequestData = {
  username: string;
  password: string;
}

type ResponseData = {
  token: string;
}
```

## /dashboard
[GET] dashboard
```typescript
type ResponseData = {
  userInfo: {
    firstName: string;
    lastName: string;
  },  
  charts: chart[]
}
```

## /chart/:id
[GET] chart
```typescript
type ResponseData = {
  chart: {};
}
```

[DELETE] chart
```typescript
type RequestData = {
  id: number;
}
```

```typescript
type ResponseData = {
  charts: { title: string; image: string; }[]
}
```

[PUT] chart
```typescript
type RequestData = {
  chart: chart;
}
```

```typescript
type ResponseData = {
  charts: { title: string; image: string; }[]
}
```

## /chart/:id/image
[GET] chart .png image
```typescript
type ResponseData = {
  chart: chart;
}
```
