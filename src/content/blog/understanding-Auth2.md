---
title : 'web authentication2 -JWTs and Oauth'
description: 'discussing json web tokens and Oauth'
pubDate: 'Sep 10 2025'
heroImage: ''
---


# Continuing from [web authentication1](understanding-Auth1.md)

so in the previous chapter we discussed the legacy authentication stratagey of storing sesions and validating with cookies 
which has session tokens 
this chapter we see how can we simplify this even further 


# ideal setup
i mean its good to day dream right our server right now uses cookies 
but what is it that we really need 
a system that is so secure and easy that all you have to do is sign in once and u stay signed in 
as long as you use the products you might as well forget that password cause u stay logged in in your device as long as u dont log out 
perfect 


# problems with cookie's session tokens and session tables 

- it is not stateless and is harder to scale 
    the session based authentication requires active sessions to be stored in a table 
    and this makes it harder to scale 

- verifiying tokens requires querying the database/keyvalue cache which is time consuming 

# is there a better way ?

- what if the session tokens were stateless instead of storing the details of the token in a database 
what if store the data in the token itself 

like the token itself contains the details like userId , expiry , created At etc 
but the token is sent to the client if anyonce can just modify the expiry by taking the token from the client 
they could impresonate other users they could extend their sessions and more so how do we handle it

what if these tokens were untamperable thats exactly what creators of jwt thought 
when we authenticate a user we give him the token 
the token itself will contain all the information in bash64 encryption , wait thats not even encryption 
thats not the point user can tamper with the data but they cant tamper with the hash

# JSON web TOkens (JWT)

JWT consists of 3 parts

1) the metadata part that has info like what type of token it is  it what algorithm is it using 
2) payload contains the jwt payload usually has things like 
        1) issued at (iat)
        2) expiry (ex)
        3) sub (userId)
        it can have more json payload as per usage
3) signature is the actual data issued by the server hashed with  a secret only server knows


during a JWT token verification server takes the incoming jwts payload and hashes it again , and compare it with the signature 
it will never match unless the jwt_secret used for hashing in the server is leaked 


## disadvantages
  - jwts cant be revoked like sessions so its good for them to have low expiry like 3mins 5mins etc to prevent session hijacking
  - impresonation by stealing jwt is still possible since expiry is so low jwt is usually 
  - token data can become stale if the expiry is high like data becomes outdated so its better for the expiryto be low 


### access tokens and refresh tokens

  main token that we will use for authorization is access token this expires fast 
  a refresh token could be a generated string stored in a db along with user details or could be long lived jwt 
 
 a refresh token can be exchanged for accessToken whenver the accessToken expires 
 its better to create a new refresh token when this exchange is done

 access tokens are usually stored in a state store in react or just a variable in memory 
 refresh token is attached to the cookie and it is httpOnly for security 

if refresh token is db managed it can be revoked by generating a new refresh token in the server



## single sing on 


## Oauth

Open Authorization is a way to Authroize
in this workflow an  authorization server handles the token issuing and validation 
