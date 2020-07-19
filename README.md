# pywb-scrapbook
Page-oriented frontend to pywb

<img src="https://raw.githubusercontent.com/ctag/pywb-scrapbook/master/logo.png" width="150px" />

## What is this?

pywb-scrapbook is a react frontend to browse and view pages you have archived with pywb. 
The built-in pywb search tool returns *all* resources (jpg, css, etc), which makes [finding the actual page previously archived difficult](https://github.com/webrecorder/pywb/issues/165).

## How does it work?

This project is currently a brittle MVP. It uses sqlite to track archived pages and CDX queries to get information from `wayback`.

## How do I set it up?

It's all manual right now. Start the express server, start the react testing server, and then start wayback. Wayback collection is hard coded to "bookmarks-archive".
