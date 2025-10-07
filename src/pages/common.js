export const applyColorVariables = (colorVars) => {
    const root = document.documentElement;
    Object.entries(colorVars).forEach(([property, value]) => {
        if (value) {
            root.style.setProperty(property, value);
        }
    });
};