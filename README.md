Seaweed takes your markdown files and stores them as HTML in Redis.

## Getting started

`npm install -g seaweed`

Register a Redis URL as an environment variable:

`export SEAWEED_REDIS_URL=some_redis_url`

## Usage

`seaweed cache /home/data/content`

## FAQ

Q: Why does this exist? What's an example use case for this?

A: I write all my notes in `vim` and store them in markdown files on my local machine. It's just faster for me, and I can then quickly version control it in Git. I have so many years of notes there now it would be a hard migration to get everything out and I'm not sure I want to. I've used different proprietary tools over the years but they seem to come and go so fast, and the price points change fast as well.
This includes my todo lists, blog content, 1:1 notes with my manager, etc. While writing is great with `vim`, reading is not always so great. So this tool exists to get content into `redis` so that clients can access it and then enjoy the data however the please. My blog site uses node and therefore uses the node redis SDK to access blog posts. My wife has a `grocery` tool we use to pull the `grocery` notes from Redis. This is just an example.

TLDR; once markdown is hoisted out of `vim` the options for reading is unlimited.


Q: Why would I not want to use this tool?

A: Plenty of reasons. Here we take the unix philosophy and great strategy of "do one thing and do it well" and throw that out the window. This tool has all of the opinions, and is dependency heavy. This was originally created for my workflow. Don't use Markdown? This won't work. Dont want the cache as HTML? This won't work. Don't use Redis? Sucks to be you. TBH, I haven't had the desire to create abstractions around those areas. This tool to this point has been highly tailored to fit my workflow. If others want to open a PR to solve their use-case we'll gladly merge it and improve the tool for everybody. Until then I don't want to guess on what potential use-cases are without user feedback, especially if those use-cases are not my own.
