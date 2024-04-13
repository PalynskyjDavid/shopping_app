$url = "http://localhost:8000/cart/delete/cartsid1"

try {
    # Send the DELETE request
    Invoke-RestMethod -Uri $url -Method Delete

    # Output success message
    Write-Host "DELETE request sent successfully to $url"
} catch {
    # Handle any errors
    Write-Host "Error occurred: $_"
}
