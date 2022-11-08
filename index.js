const app=require("./app");
const PORT=process.env.PORT || 8080;
app.listen(PORT,function () {
    console.log(`Server Runimg at http://localhost:${PORT}`);
})