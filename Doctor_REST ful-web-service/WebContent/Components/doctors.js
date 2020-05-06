$(document).ready(function()
{
	if ($("#alertSuccess").text().trim() == "")
	{
		$("#alertSuccess").hide();
	}
	
	$("#alertError").hide();
});

//SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	
	// Form validation-------------------
	var status = validateDoctorForm();
	
	if (status != true)
	{
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	
	// If valid------------------------
	var method = ($("#hidDoctorIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax(
	{
		url : "DoctorsAPI",
		type : method,
		data : $("#formDoctor").serialize(),
		dataType : "text",
		complete : function(response, status)
		{
			onDoctorSaveComplete(response.responseText, status);
		}
	});
});

//UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
	$("#hidDoctorIDSave").val($(this).closest("tr").find('#hidDoctorIDUpdate').val());
	$("#doctorCode").val($(this).closest("tr").find('td:eq(0)').text());
	$("#doctorName").val($(this).closest("tr").find('td:eq(1)').text());
	$("#doctorSpec").val($(this).closest("tr").find('td:eq(2)').text());
	$("#doctorCont").val($(this).closest("tr").find('td:eq(3)').text());
	$("#doctorHospital").val($(this).closest("tr").find('td:eq(4)').text());
});

function onDoctorSaveComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divDoctorsGrid").html(resultSet.data);
		} 
		else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} 
	else if (status == "error")
	{
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} 
	else
	{
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	
	$("#hidDoctorIDSave").val("");
	$("#formDoctor")[0].reset();
}

$(document).on("click", ".btnRemove", function(event)
{
	$.ajax(
	{
		url : "DoctorsAPI",
		type : "DELETE",
		data : "doctorID=" + $(this).data("doctorid"),
		dataType : "text",
		complete : function(response, status)
		{
			onDoctorDeleteComplete(response.responseText, status);
		}
	});
});

function onDoctorDeleteComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divDoctorsGrid").html(resultSet.data);
		} 
		else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} 
	else if (status == "error")
	{
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} 
	else
	{
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}


function validateDoctorForm()
{
	// CODE
	if ($("#doctorCode").val().trim() == "")
	{
		return "Insert Doctor Code.";
	}
	
	// NAME
	if ($("#doctorName").val().trim() == "")
	{
		return "Insert Doctor Name.";
	}
	
	//PRICE-------------------------------
	if ($("#doctorSpec").val().trim() == "")
	{
		return "Insert Doctor Specilization.";
	}
	
	// is numerical value
	var tmpPrice = $("#doctorCont").val().trim();
	
	if (!$.isNumeric(tmpPrice))
	{
		return "Insert a numerical value for Contact No.";
	}
	

	
	// DESCRIPTION------------------------
	if ($("#doctorHospital").val().trim() == "")
	{
		return "Insert Doctor Description.";
	}
	
	return true;
}