# React-SpringBoot WebSocket Chat Application

This repository contains a simple chat application that uses React for the frontend and Spring Boot for the backend, with WebSocket communication between the two.

## Overview

The chat application allows users to send and receive messages in real-time. It uses STOMP over WebSocket for messaging. The frontend is built with React, utilizing hooks for state management and effect handling. The backend is a Spring Boot application that configures a WebSocket endpoint and message handling using the `@MessageMapping` annotation.

## Features

- Real-time messaging
- Connection to WebSocket using SockJS and STOMP
- React frontend with functional components
- Spring Boot backend with WebSocket configuration

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Java 11 or above
- You have installed Node.js 12 or above
- You have a basic understanding of React and Spring Boot

