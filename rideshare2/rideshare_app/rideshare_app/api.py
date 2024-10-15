import frappe

@frappe.whitelist()
def register_user(username, user_type):
    try:
        taxi_user = frappe.get_doc({
            "doctype": "Taxi User",
            "username": username,
            "user_type": user_type.capitalize()
        })
        taxi_user.insert()
        frappe.db.commit()
        return {"message": f"Successfully registered as {user_type}"}
    except Exception as e:
        frappe.log_error(f"Error registering user: {str(e)}")
        frappe.throw("Error registering user. Please try again.")