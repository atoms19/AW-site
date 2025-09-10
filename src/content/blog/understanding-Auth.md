---
title : 'web authentication1 - cookie auth and sessions'
description: 'cookie auth and sessions'
pubDate: 'Sep 10 2025'
heroImage: ''
---


# Why do we need authentication 

people from all over the world login to diffrent websites on a day to day basis,
the server serving the website or the api needs to understand who is that the one using their website 

how do they do this without invading our space like using our camera and microphone and always hiring indians to see if 
they are the real user or not imagine tho 
lmaoo


# easiest auth (password and username)
its not that hard to understand that we need a better way to identify users 
we assign unique names to users whenever they signs up for our service
we also ask them a password during signup we will store the username and password in our database 

and whenever user decides to use our service again we can have them log back in by their username 
but for any username they enter we check if it is there in our db and if it is we ask them password 
only the original person who signed up remembers the password will be able to enter it again thus when they ave 
successfully entered it we assume that the user behind the ip is the real person 
unless the user was stupid and he shared his password and username or someone stole it 

as you can see this is just a very basic way to do auth not very reliable

## email 
sometimes usernames are your entire identinty on the platform it can also allow us to set display name etc
but people can actually just farm usernames and take up most of the namespace not just that they can create so many 
fake accounts using the above way 

so whats better we could use email as the unique way to identify a user since emails are already unique 
and the process of making fake account now becomes harder as the user needs to create another email which is an extra inconvinenece 
collecting email also has another benifit is that you could send password reset links and other important things
like ads and stupid promotions in their spam yaaayy


one of the big drawbacks in our old system that didnt use email was that 
suppose you came first to the platform and secured your favourite username lets say `shrek`
and you set a good password for it so that others cant just guess the password and sign in 

you got busy with life got married had kids and had to work you forgot the password to your favourite shrek account 
this can be fatal as this account had valuable stuff maybe followers and most of all that special username 
now that is gone now what will you do !!

reset my password 🙌 but how the site that didnt ask for email can never reach u with any reset link 
they have lost all contact with you ha ha done bro your account is gone forever 
this is why we collect emails 


### email verification 
> hmm lets say i want to create a new fake account to troll some people , lets see let me use my cousins email 
> so he'll be responsible for all the warcrimes i am about to commit 👿
>                                       - some troll 


to prevent such trolls from making accounts using any emails (might be your moms) we have to 
verify the email , like asking if the person who wants to create the account under this email has acces
to this specific email account 

best way is to just send the email address a mail and ask them to read the mail and type the stuff u just sent 
only the person who has access to the email will be able to do that right ... thats the point 


```
user signs up -> enters email -> [verifies if no other user exist under same email]
                                 [ generates a verification code]
                                 [sends the verification code to the entered email]
            when user enters the code ->[cross check generated code and verification code]
            [if so email belongs to the user and we continue]
            [create user in users_table with details]
            [redirect to dashboard or home or whatever]
```



## logging in 

signing up was the easy part now its all about authorization , first off when making our website we need to decide 
which parts are easily accessble by anybody and which parts are only for specific people has signed up 

this means we have to perform checkssss.....

lets say our site has a landing page , everyone should be given access to this as well as the signup and login form pages 
any other route unless user has logged in shouldnt be sent to any user without authentication 

how do we do this we can just ask them the password and let them in right ... 
its not that simple 
on the server we have to see if the request is comming from a validated device or not 
for that we need to lock access to all those routes

how do we lock the routes first , obv we can redirect them to login page when they try to access a locked route if they are not logged in 
how do we know if the user is logged in or not 
its the browser that is sending the request to the server (GET requests) 

how ....
its all about cookeies 🍪 and sessions 

### cookie auth and session logic 

cookies are sent along with any request to the server

lets just assume that we just have 2 public routes login and signup 
once user A signs up his account gets created in the db 

when he logs back in successfully we create a session under a new table session_table 
session contains information like timestamps representing when the session started and 
an expiration time like `currentTime()+5mins` or smthn sessions can be 10-20mins long along with the userid (session owner)
u can have fields like revoked but thats for later anyways whenver user successfully logs back in 
just like writing in a hotel entry register 


cookies are like gifts exchanged between browser and server 
when server gives browser a cookie browser whenver talking to the server will send that cookie to server 
this helps server identify which browser is talking lol

```
[user logs in successfully]-> [ create a new session ]
                                    |-[create a session token]
                                    |- [ expiry : currentTime + sessionDuration]
                                    |- [userId : person who created the session]
                                    |- [add all these values as a new session row to db]
                            <- [send the user session token ,request browser to store it as a cookie]


    [request to protected route with cookie]-> [extract session_token fromt the cookie]->
                                               |-[ see if there is a session in db with this token]
                                               |-[ if there is see if that token has expired]
                                               |- [if it hasnt then get the user of that session , the request is from that user (u could have a getSessionUserMethod) or smthn]
                                               |- [authorization is successful return the page requested]
                                               |- [else reroute to login /signup]
```

## log out 
when a user logs out (hits the /logout) endpoint we just delte the session_row corresponding to the session he was logged into 

### session hijacking 

good advice  is to not to leave your laptop unlocked infront of a geek or a hacker 
they can easily `ctrl+shift+i` to dev tools and get your token from the cookie's session 


now they'll open thier laptop and enter this token into their browser now theier browser can impresonate as your session
crazy right this is called session hijacking and it allows people to do crazy damange to your account 

while hijacked bro could change your profile pic , change your name , post nsfw whatever you are cooked 

funny thing is that u dont even have to leave your laptop open
session hijacking can also happen by malicious code injection technique known as **XSS**
or by using http in 2025 http requests r not secure and man in the middle can inspect the packages u send and see your token and hijack
dont fricking visit websites with no https
#### revoking 
revoking a session comes handy in such cases websites with session revoking has an advantage here 
revoked is basically a column in the db of the session_table it says if the session has been revoked or not (boolean)
so u found that someone stole your session 
you could just go to your account and revoke that particular session (some websites gives u a menu to manage sessions)
but most users wont know this shi

hey hey hay this isnt a websecurity guide so ill shut up
but use sameSite =Lax , httpsOnly and stuff like that in cookie to say that cookie will only work 

### sliding expiration
 our current system expires the session after a fixed time we set while the session was created this is fixed window 
 but this prevents our users from using our platform for long periods as every 20mins theyll have to log back in and this would break their flow 

 another way to do it is sliding expiration in this method whenver user sents a successuful request to any protected route 
 theier session's expiry gets extended by a couple of minutes this will add up and let the user work for longer periods with the same session without needing to log back in 

## scalability

as you scale your server to multiple's with a load balancers like all successful sites session auth will hold u back 
as each server should now eitehr choose to replicate teh session db or just use a centralised cache store like redis 
for storing the session (best to use centralised redis store) 

sticky sessions can also be done by setting up redis in each server and telling the load balancers to consistently route the user to the same server
this can be done by ip hashing but if server goes down session is lost 

## conclusion 

cookie session auth is pretty good if u do it well
scalability is meh but it does the job 

this article is getting pretty long so next topics jwts will be discussed in the next article 

