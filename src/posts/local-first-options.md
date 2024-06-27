---
title: The Spectrum of Local First Libraries
date: '2024-06-26'
tags:
  - javascript
  - local-first
  - 
category: posts
status: LIVE
---

Local First is bound to be the next big thing in web development. In this post, I explore the sepctrum of what libaries and platforms exist and where they fit into the landscape.

<!-- excerpt -->

## Why Should I Care About Local First

Local first, which is more than just offline data with syncing, is a way of writing softward that feels good for your users. It's the closet thing to native mobile apps that we can do on the web and is more than possible. The best apps you use today are local first and you might not even know it. They are faster, work in bad network conditions, and feel smooth as hell. If you'd like to learn more about why you should use local first, read these posts https://localfirstweb.dev

## What Should I Use For Local First?

There is a massive amount of new services and libraries that promise to be the best solution for local first, but in my experience which one you should choose depends largely on your needs and your project. I know "it depends" sucks as an answer, but I'm going to try to make this easy. 

So. Below, I'm going to list some really interesting projects that will help you on your data syncing journey listed from Most Full Featured / Lease Flexible -> Least Full Featured / Most Flexible, with considerations as to if you are starting a project fresh or not.

## The "Do It All For Me" Options

These are best for people starting a new project from scatch or migrating all of your data over, becuase these options will take control of the entire data flow of your app. From server saving db, to local data, to syncing. These replace it all and might not be the most appropriate for sites where you have an existing database.

A bummer about many of these tools is that they all take a "React First" approach instead of a web first approach where you are getting worse docs for non-React based projects. Not a big deal, just annoying, but that's the industry right now.

### Triplit

https://www.triplit.dev/

A true, all encompassing platform. It handles everything from storing persistant data to syncing and local offline data. There is even a great dashboard UI. The best part is, you can self host if you'd like full ownership, or use their easy managed DB as a service platform. 

#### Features

* Open Source
* Real time sync
* Offline 
* Relational data
* Backup DB

#### The Downsides

It has it's own query language, which means you have to pick up a new way to query data. It's not complicated or difficult, but just something to keep in mind. I found the docs to be missing some steps in regards to self hosting, so expect some bumps, but I'm sure they are working on it. Because this does it all for you, expect less transparency in where the data is actually living serverside, instead of having your own managed db, you have the Triplit platform.

#### The Verdict

Super nice to use. I had a gerat time picking up this platform and will continue to work in it. I personally prefer a more full featured system ( I did come from Meteor after all ), so this scatches that itch nicely.

### Evolu

https://www.evolu.dev/

This is another really nice "do everything" platform. The big difference here is that Evolu uses Kysely as an ORM and SQLite in the browser instead of IndexedDB. Like Triplit, you can also run your own backup and sync server. In practice, this felt a lot like Triplit to get setup and use, where Triplit includes some interesting UI based dashboards that Evolu doesn't where Triplit doesn't offer SQlite in browser for local data.

Compared to Triplit, I found this to be slightly more verbose. Where Triplit subscribing to data gets you an initial fetch and update, Evolu has to set up a subscribe as well as do the initial query. It's a very small thing, and not important, but a small glimpse into some of the added code complexities to do the same thing. That said it's very simple compared to many of the more flexible options we'll see soon.

* Open Source
* Real time sync
* Offline 
* Relational data
* Backup DB


## Give Me More Control

Many of these options provide you the syncing layer and the local db layer but don't give you a backend. This makes them more interesting for people who want to integrate into their existing stack. Doing more is certainly not an awful thing when the result is more control, you have more work todo yourself.
 
### RxDB

RxDB is a really great mature option here where as they say, "Offline is optional" as an offline and local first data layer. It works with everything and gives you data syncing, but you need to integrate into your own backend. RxDB even has integrations into CouchDB, Firestore, Supabase and more. If all of this sounds awesome, it's because it is. That said it comes with a downside and that downside is that it's a paid option.  

#### Pricing

While the core is open source, many of the best features are behind a pay wall that can get somewhat costly for small time hackers just looking to get going.

The price also can be looked at as a positive because this is a product, you can have more confidence that it just won't go away anytime soon, that said if you aren't looking to potentially cough up $200/m you might want to look elsewhere. Don't let this post disuade you from looking at it though because it's an incredible option, look at their pricing page and decide if the price is too high https://rxdb.info/premium

### Elecctric SQL

https://electric-sql.com

Once again this gives you the most complex aspect, the sync layer while letting you have more control. It's meant to work diectly with a Postgres db and allows you to connevt via common backends like Prisma, Rails, Laravel and more. It also works well with most front-ends but once again a huge emphasis on React instead of the web platform itself. That's fine because there is nothing stopping you from using it without React, just know the happy path for most of the docs is in React.

Another really appealing thing with ElectricSQL is that is uses an in browser SQLite instead of Indexedb

#### Pricing

This is a self hosted option and is free to use because of that. There are instructions on how to use with Docker, DigitalOcean, Kbernetes, Supabase and more. 

#### The difficulty

While this option is very flexible, there is a distinct focus on ease of use here. However since there are great integrations for things like Prisma, it means that if you are off that happy path, this isn't for you. Overall for a middle of the road version of "do it all for me" ElectricSQL is one of the most interesting options.


### PouchDB

https://pouchdb.com

TODO Pouch seems interesting, but there is a whole world of Couch and PouchDb that I need to explore more before having an opinion on it.

### TinyBase

https://tinybase.org

Like many of these, you have to sync to your own backend while getting access to really great syncing / local storage options. There is even flexibiltiy in which sync system you use (Y.js, Powersync, ect). If that sounds interesting to you, this is a great option, but in a world of JavaScript fatigue and too many choices, my outlook with these tools right now is wanting less choices in these relms, but many others would probably have the opposite opinion. Sadly though, once again most of the UI aspects of this are tuned just for React with the entirety of the "Build UIs" part of the docs showing only React. 

#### DX

There is also an interesting query language to store and retive things using language like setRow, setTable instead of a sql like syntax. It's interesting and looks nice, but the unique syntax might be a turn off for some. 

#### The Best Parts

TineBase seems totally rock solid with 100% test coverage, and a long history of active development. This is mature software that will work well for you. It also has a tiny footprint which is great for local software.

## I Want To Do It All

For those of you that want the most control, there are many options that take care of the toughest parts in the sync layer. I'll talk less about these since most of them are just sync layers, but there are al ot of great options here and these are some of them.

### Replicache

https://replicache.dev/

Replicache is a super enticing option. It's a client-side sync framework and it has a lot of fans. It is BYOBackend like many of these past few options but it has a great focus on DX and is trusted by many. I haven't used myself beyond looking at demos, so I'll keep this brief. It's a really nice looking option and one of the best for people who want more control.

#### The Bummer

Cost here is the big bummer. The good news is that it's free for non-commercial projects but expensive for commecrial products ($500/m with <1k profiles> && <$200k ARR>). There is also no self hosted version that I could find. This is a serious option for serious business or people wanting to learn.


#### Backend Strategies

Another issue with some of these "do it yourself" type of platforms is just how much you need to learn and do yourself. This is evident by Replicache's [Backend Strategies](https://doc.replicache.dev/strategies/overview) page. It's a great resource, but I'm not at the stage where I want to research backend strategies when picking up new local first work. I'd prefer the platform have the strategy figured out. That said this is a very good thing for many, and if you want to strategize about your backend, you'll love this. 

### PowerSync

https://www.powersync.com

Powersync rules. It's a great option for a syncing layer that offers a paid sync server or a self hosted one. While PowerSync attempts to break this down with diagrams on their homepage, just looking at the complexity can make your headspin at first glance if you are trying to get going for the very first time. That said there is an incredible Supabase integration that can give you a good kickstart. 

PowerSync also works with a local WA based SQLite db and that rules. You do however need to write the remote db saving process yourself and that can seem like a good thing or bad thing depending on how much control you want and what stage your project is in. 

#### Note About Schemas

Another thing that's not unique to PowerSync but present in many of these options is that you need a local schema. I know that makes sense in many cases, but I could see situations where you are making a lot of duplicate schemas for the backend/db and the local/db.

### Yjs

The truest of the "I want to do the most" type of these. Yjs can be a challenge but is well worth your exploration if you have the patience and time to learn. It's a great way to learn a ton about the syncing layer.

## Conclusion

Give some of these a try. If you are looking to try it out for the first time, the easiest thing to do is give one of the less flexible options a try and build a todo list. Once you do that, prehaps try to get into something more complex and add to your existing app, or build something more complex.

Local First software imo is the next big thing. Now's a great time to pick up some sick techniques.

- Scott