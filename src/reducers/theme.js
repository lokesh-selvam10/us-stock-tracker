const themeReducer = (state = { theme: "basic", color: "#111" }, action) => {
    switch (action.type) {
        case "normalTheme":
            return state = { theme: "normalTheme", color: "#111" }
        case "darkTheme":
            return state = { theme: "darkTheme", color: "#fff", background: '#0f171e' }
        default: return state
    }
}
export default themeReducer