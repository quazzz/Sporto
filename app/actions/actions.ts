
export async function CreateUser(email: String, password: String, name: String){
    const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });
    return response
}
