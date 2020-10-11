# Cards Against Humanity Clone

## View the Live Site

*Coming Soon*

## Features

- Custom Game logic using classes
- Client and Server talk through Socket.IO
- React app is served via express
- Functional components with React Hooks!

## Structure

```bash
.
├── client
│   ├── public              # favicon & other icons
│   └── src
│   │   ├── components      # Components
│   │   │   │── common        # Common components
│   │   │   └── theme         # Header & Footer
├── server
│   └── game                # Core game classes and logic
│   ├── middleware          # Middleware functions
│   ├── socket              # Socket.IO manager function
└── └── util                # Util functions
```

## Built with

- Express
- Socket.IO
- React
- VSCode
- And these useful JavaScript libraries [package.json](package.json) | [client](./client/package.json)