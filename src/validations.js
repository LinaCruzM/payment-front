import Swal from 'sweetalert2'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import * as XLSX from 'xlsx'
pdfMake.vfs = pdfFonts.pdfMake.vfs

export const handleResponse = (res, name, successMessage, duplicateAlert, numberCharacters,number15Characters, invalidFormat, duplicateDocument=null) => {
  if (res.data && res.data.status === false && res.data.message) {
    let messageToShows = res.data.message[0];
    let messageToShow = res.data.message;

    if (messageToShows.includes('format is invalid')) {
      messageToShow = invalidFormat;
      showSwalAlert(null, messageToShow, 'error');
  
  } else if (messageToShows.includes('has already been taken')) {
      messageToShows = duplicateAlert;
      showSwalAlert(name, messageToShows, 'error');
      
  } else if (messageToShow.includes('value tried to register')) {
      messageToShow = duplicateAlert;
      showSwalAlert(name, messageToShow, 'error');
     
  }
  else if (messageToShows.includes('value tried to register.')) {
    messageToShows = duplicateAlert;
    showSwalAlert(name, messageToShows, 'error');
   
}
  else if (messageToShow.includes('The document you are trying to register already exists')) {
      messageToShow = duplicateDocument;
      showSwalAlert(name, messageToShow, 'error');
     
    }
    else if (messageToShows.includes('The tel number must be at least 7 characters')) {
        messageToShows = numberCharacters;
        showSwalAlert(name, messageToShows, 'error');
       
  }  
  else if (messageToShows.includes('The tel number must not be greater than 15 characters')) {
    messageToShows = number15Characters;
    showSwalAlert(name, messageToShows, 'error');
   

}  
  } else if (res.data && res.data.status === true) {
    let messageToShow = successMessage;
    showSwalAlert(name, messageToShow, 'success');
  }
};

export const showAlert = (name, message, icon) => {
  Swal.fire({
    title: name,
    text: message,
    icon: icon
  });
}

export const handleResponsePassword = (res, name, sameNewAsOld, successMessage, passwordWrong) => {
  if (res.data && res.data.status === false && res.data.message) {
    let messageToShow = res.data.message

    if (messageToShow.includes('New password cannot be the same as the old password')) {
      messageToShow = sameNewAsOld
      showSwalAlert(name, messageToShow, 'error')
 
    } else if (messageToShow.includes('Password does not match')) {
      messageToShow = passwordWrong
      showSwalAlert(name, messageToShow, 'error')
    
    } else if (messageToShow.includes('The old password does not match')) {
      messageToShow = passwordWrong
      showSwalAlert(name, messageToShow, 'error')
   
    }
  } else {
    let messageToShow = res.data.message
    if (messageToShow.includes('Password was successfully changed')) {
      messageToShow = successMessage
      showSwalAlert(name, messageToShow, 'success')
      
    }
  }
}
export function validateFields(fields, messageRequired) {
  const errors = {};
  for (let field of fields) {
    if (!field.value) {
      errors[field.name] = messageRequired;
    }
  }
  return errors;
}
export const handleResponsePersons = (
  res,
  name,
  successMessage,
  invalidFormat,
  numberCharacters,
  number15Characters,
  mailFormat,
  birthdate,
  duplicateDocument
) => {
  if (res.data && res.data.status === false && res.data.message) {
    let messageToShows = res.data.message[0]
    let messageToShow = res.data.message
    if (messageToShows.includes('format is invalid')) {
      messageToShow = invalidFormat
      showSwalAlert(null, messageToShow, 'error')

    }else  if (messageToShows.includes('must be at least 7 characters')) {
      messageToShows = numberCharacters
      showSwalAlert(name, messageToShows, 'error')
     
    } else if (messageToShows.includes('must not be greater than 15 characters')) {
      messageToShows = number15Characters
      showSwalAlert(name, messageToShows, 'error')
   
    } else if (messageToShows.includes('The mai mail format is invalid')) {
      messageToShows = mailFormat
      showSwalAlert(name, messageToShows, 'error')
     
    }
    else if (messageToShows.includes('must be a valid email address')) {
      messageToShows = mailFormat
      showSwalAlert(name, messageToShows, 'error')
   
    }
    else if (messageToShows.includes('The per expedition must be a date after or equal to per birthdate')) {
      messageToShow = birthdate;
      showSwalAlert(name, messageToShow, 'error');
    
    }
    else if (messageToShow.includes('The document you are trying to register already exists')) {
      messageToShow = duplicateDocument;
      showSwalAlert(name, messageToShow, 'error');
     
    }
  } else if (res.data && res.data.status === true) {
    let messageToShow = successMessage
    showSwalAlert(name, messageToShow, 'success')
  }
}

export const handleErrorLog = (error) => {
  if (error.response) {
    // Error de respuesta (por ejemplo, error HTTP)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `${error.response.status} - ${error.response.data.message}`,
      confirmButtonColor: '#dd0034'
    })
    console.error(error.response.data)
  }
  if (error.request) {
    const messageToShow = error.response.data.message.message

    if (messageToShow.includes('passw')) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        confirmButtonColor: '#dd0034',
        text: `${error.response.data.message.message}`
      })
      showSwalAlert(null, messageToShow, 'error')
    }

    console.error('Error de solicitud:', error.response.data)
  } else {
    // Otros tipos de errores
    Swal.fire({
      icon: 'error',
      title: 'Error',
      confirmButtonColor: '#dd0034',
      text: 'Error: Se produjo un error inesperado'
    })
    console.error('Error inesperado:', error.message)
  }
}
export const handleResponseauth = (res, name, successMessage, duplicateAlert, invalidFormat) => {
  const array_errors = ['name has already been taken']

  //console.log(res, name, successMessage, duplicateAlert, invalidFormat)
  if (res.data && res.data.status === false && res.data.message) {
    let messageToShow = res.data.message[0]
    for (let i = 0; i < array_errors.length; i++) {
      if (array_errors.includes(array_errors[i])) {
        messageToShow = duplicateAlert
        showSwalAlert('', messageToShow, 'error')
      }
    }

    let password = res.data.message
    //let messageToShows = res.data.message;

    /*if (messageToShow.includes('name has already been taken')) {
      messageToShow = duplicateAlert;
      showSwalAlert(name, messageToShow, 'error');
    }
    else*/ if (messageToShow.includes('format invalidate')) {
      messageToShow = invalidFormat
      showSwalAlert(null, messageToShow, 'error')
    } else if (password.includes('No reservation made')) {
      password = invalidFormat
      showSwalAlert(null, password, 'error')
    } else if (messageToShow.includes('No users registered')) {
      messageToShow = invalidFormat
      showSwalAlert(null, messageToShow, 'error')
    } else if (messageToShow.includes('Access denied')) {
      messageToShow = invalidFormat
      showSwalAlert(null, messageToShow, 'error')
    }
  }
  if (res.data && res.data.status === true) {
    let messageToShow = successMessage
    showSwalAlert(name, messageToShow, 'success')
  }
}

export const validateEmail = (email, institutional) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@uniempresarial\.edu\.co$/

  if (email === '') {
    return { message: institutional, isEmpty: false }
  } else {
    if (!emailRegex.test(email)) {
      return { message: institutional, isEmpty: true }
    }
  }

  return ''
}
export function validateNamePerson(name, invalidFormat) {
  const nameRegex = /^[a-zA-ZñÑÁÉÍÓÚáéíóú\s]{1,50}$/
    if (!nameRegex.test(name.trim())) {
      return { message: invalidFormat, isValid: false }
    }

  return { message: '', isValid: true }
}

export function validateName(name, invalidFormat) {
  const nameRegex = /^[a-zA-Z0-9ñÑÁÉÍÓÚáéíóú\s]{1,50}$/
    if (!nameRegex.test(name.trim())) {
      return { message: invalidFormat, isValid: false }
    }

  return { message: '', isValid: true }
}
export function validatePginaWeb(name, invalidFormat) {
  const nameRegex = /^[a-zA-Z0-9-]+\.(?:[a-zA-Z]{2,}|[a-zA-Z]{2}\.[a-zA-Z]{2})$/
    if (!nameRegex.test(name.trim())) {
      return { message: invalidFormat, isValid: false }
    }

  return { message: '', isValid: true }
}

export function validateReason(name, invalidFormat) {
  const nameRegex = /^[a-zA-Z0-9ñÑÁÉÍÓÚáéíóú\s.]{1,100}$/
    if (!nameRegex.test(name.trim())) {
      return { message: invalidFormat, isValid: false }
    }

  return { message: '', isValid: true }
}
export function validateNIT(name, invalidFormat) {
  const nameRegex = /^(?!0)[0-9]{8,25}$/
    if (!nameRegex.test(name)) {
      return { message: invalidFormat, isValid: false }
    }

  return { message: '', isValid: true }
}
export function validateAdress(name, invalidFormat) {
  const nameRegex = /^(?=.*[a-zA-Z0-9])[\w\s\-#]{1,255}$/
  if (!nameRegex.test(name)) {
    return { message: invalidFormat, isValid: false }
  }
return { message: '', isValid: true }

  }
export function validateDocument(document, invalidDoc) {
  const documentRegex = /^(?!0)[a-zA-ZáéíóúÁÉÍÓÚüÜ0-9]{1,25}$/
    if (!documentRegex.test(document)) {
      return { message: invalidDoc, isValid: false }
    }
  
  return { message: '', isValid: true }
}

export const validatePassword = (password, invalidFormat) => {
  let mensaje = ''
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_$@$!%*?&+[\].-])[A-Za-z\d _$@$!%*?&+[\].-]{8,50}$/

  if (password === '') {
    mensaje = ''
  } else {
    if (!passwordRegex.test(password)) {
      mensaje = invalidFormat
    }
    return mensaje
  }
}

export const validateSame = (newPassword, confirmPassword, notSame, Same) => {
  let mensaje = ''

  if (confirmPassword === '') {
    return { message: '', isValid: '' }
  } else {
    if (newPassword === confirmPassword) {
      return { message: Same, isValid: true }
    } else if (newPassword !== confirmPassword) {
      return { message: notSame, isValid: false }
    }
    return mensaje
  }
}

export const validateTelephone = (telephone, minNumber, maxNumber, regex) => {
  const minNum = 7
  const maxNum = 10
  const telephoneRegex = /^[0-9\s-()+]+$/
  let mensaje = ''

  if (telephone === '') {
    mensaje = ''
  } else {
    if (telephone.length < minNum) {
      mensaje = minNumber
    } else if (telephone.length > maxNum) {
      mensaje = maxNumber
    } else if (!telephoneRegex.test(telephone)) {
      mensaje = regex
    }
    return mensaje
  }
}
export const validateMails = (email, errorMessage) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (email === '') {
    return { message: errorMessage, isEmpty: false }
  } else {
    if (!emailRegex.test(email)) {
      return { message: errorMessage, isEmpty: true }
    }
  }

  return ''
}



/*
export const validateMails = (email, invalidFormat) => {
  const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/
  let mensaje = ''

  if (email === '') {
    mensaje = ''
  } else {
    if (!emailRegex.test(email)) {
      mensaje = invalidFormat
    }
    return mensaje
  }
}
*/
export const showPassword = (inputId) => {
  const passwordInput = document.getElementById(inputId);
  const iconSpan = document.querySelector(`#${inputId} + .btn .icon`);

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    iconSpan.classList.remove('fa-eye-slash');
    iconSpan.classList.add('fa-eye');
  } else {
    passwordInput.type = 'password';
    iconSpan.classList.remove('fa-eye');
    iconSpan.classList.add('fa-eye-slash');
  }
}

export const showSwalAlert = (
  title,
  message,
  icon = 'error',
  confirmButtonColor = '#dd0034',
  cancelButtonColor = '#d33'
) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: message,
    confirmButtonColor: confirmButtonColor,
    cancelButtonColor: cancelButtonColor,
    confirmButtonText: 'OK'
  })
}

export function validateStatus(status) {
  if (!status) {
    return 'Este campo es obligatorio.'
  }
  if (isNaN(parseInt(status)) || ![0, 1].includes(parseInt(status))) {
    return 'El estado debe ser 0 o 1.'
  }
  return ''
}

export function validateDate(dateString, moreThanActual, minYear, minYearMessage) {
  let mensaje = ''
  const [year, month, day] = dateString.split('-').map(Number)

  // Meses en JavaScript van de 0 a 11, por eso restamos 1 al mes
  const input = new Date(year, month - 1, day)
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  const minYearDate = new Date(minYear) // Convierte minYear de cadena a objeto Date
  const inputDate = input

  if (inputDate < minYearDate) {
    mensaje = minYearMessage
    return mensaje
  } else if (inputDate > currentDate) {
    mensaje = moreThanActual
    return mensaje
  }
  return ''
}

export function validateTime(expdate, birthdate, minorExpDate) {
  const expDateObj = new Date(expdate)
  const birthDateObj = new Date(birthdate)

  if (expDateObj < birthDateObj) {
    return minorExpDate
  }
  return ''
}

export function validateStartTime(selectedDate, startTime) {
  const currentDate = new Date()
  // Verificar si la fecha seleccionada es hoy
  if (selectedDate.toDateString() === currentDate.toDateString()) {
    // Verificar si res_start es menor que la hora actual
    if (startTime < currentDate) {
      return 'Elegiste el día actual, la hora de inicio debe ser mayor que la hora actual'
    }
  }
  return ''
}

//funcion de errores
export const handleError = (error) => {
  if (error.response) {
    // Error de respuesta (por ejemplo, error HTTP)
    showSwalAlert(null, error.response.data.message, 'error')
    console.error('Error de respuesta:', error.response.data)
  } else if (error.request) {
    // Error de solicitud (por ejemplo, problema de red)
    showSwalAlert('Error de solicitud:', error.request, 'error')
    console.error('Error de solicitud:', error.request)
  } else {
    // Otros tipos de errores
    showSwalAlert('Error inesperado:', error.message, 'error')
  }
}

export const exportToCSV = (title, data) => {
  const wb = XLSX.utils.book_new()
  const excelTable = document.getElementById('table')

  // Extract column names dynamically from the first item in the data array
  const columnNames = []
  excelTable.querySelectorAll('th').forEach((headerCell) => {
    if (headerCell.cellIndex !== excelTable.rows[0].cells.length - 1) {
      columnNames.push({ text: headerCell.textContent.trim(), style: 'tableHeader' })
    }
  })


  // Map each item in the data array to an array of corresponding values
  const excelData = data.map((row) => Object.values(row))

  // Insert column names as the first element in the data array
  excelData.unshift(columnNames.map((col) => col.text))

  // Convert the data to Excel sheet format
  const ws = XLSX.utils.aoa_to_sheet(excelData)

  // Append the sheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  // Write the workbook to an Excel file
  XLSX.writeFile(wb, `${title}.xlsx`)
}

export const exportContactsToCSV = (title, data) => {
  const wb = XLSX.utils.book_new()
  const excelTable = document.getElementById('table')

  // Extract column names dynamically from the first item in the data array
  const columnNames = []
  excelTable.querySelectorAll('th').forEach((headerCell) => {
    if (headerCell.cellIndex !== excelTable.rows[0].cells.length) {
      columnNames.push({ text: headerCell.textContent.trim(), style: 'tableHeader' })
    }
  })

  // Map each item in the data array to an array of corresponding values
  const excelData = data.map((row) => Object.values(row))

  // Insert column names as the first element in the data array
  excelData.unshift(columnNames.map((col) => col.text))

  // Convert the data to Excel sheet format
  const ws = XLSX.utils.aoa_to_sheet(excelData)

  // Append the sheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  // Write the workbook to an Excel file
  XLSX.writeFile(wb, `${title}.xlsx`)
}


export const exportNewsToCSV = (title, data, columnMapping) => {
  const wb = XLSX.utils.book_new();
  
  // Obtener los datos reales (sin el proxy) si es un ref
  const dataArray = Array.isArray(data._value) ? data._value : data;
  
  // Extraer los nombres originales de las columnas del primer elemento en el array de datos
  const originalColumnNames = Object.keys(dataArray[0]);
  
  // Obtener los alias correspondientes para las columnas originales
  const columnAliases = originalColumnNames.map(name => columnMapping[name] || name);
  
  // Mappear cada elemento en el array de datos a un array de valores correspondientes
  const excelData = dataArray.map(item => columnAliases.map(alias => item[alias]));
  
  // Insertar los alias de columnas como el primer elemento en el array de datos
  excelData.unshift(columnAliases);
  
  // Convertir los datos al formato de hoja de Excel
  const ws = XLSX.utils.aoa_to_sheet(excelData);
  
  // Agregar la hoja al libro de trabajo
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  // Escribir el libro de trabajo en un archivo de Excel
  XLSX.writeFile(wb, `${title}.xlsx`);
}


//funcion exportar pdf

export const exportToPDF = (title, data) => {
  const pdfTable = document.getElementById('table')
  const columnNames = []
  pdfTable.querySelectorAll('th').forEach((headerCell) => {
    if (headerCell.cellIndex !== pdfTable.rows[0].cells.length - 1) {
      columnNames.push({ text: headerCell.textContent.trim(), style: 'tableHeader' })
    }
  })
  const rowData = data.map((row) => Object.values(row))
  const documentDefinition = {
    content: [
      {
        text: title,
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      {
        table: {
          headerRows: 1,
          widths: Array(columnNames.length).fill('auto'),
          body: [
            columnNames,
            ...rowData.map((row) => row.map((cell) => ({ text: cell.toString(), noWrap: false })))
          ]
        }
      }
    ],
    styles: {
      tableHeader: {
        bold: true,
        fillColor: '#0e1f87',
        color: 'white',
        alignment: 'center'
      },
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      }
    },
    pageSize:
      columnNames.length > 5
        ? {
            width:950,
            height: 612,
            orientation: 'landscape'
          }
        : {
            width: 612,
            height: 792,
            orientation: 'portrait'
          }
  }
  pdfMake.createPdf(documentDefinition).open()
}

export const exportContacstToPDF = (title, data) => {
  const pdfTable = document.getElementById('table')
  const columnNames = []
  pdfTable.querySelectorAll('th').forEach((headerCell) => {
    if (headerCell.cellIndex !== pdfTable.rows[0].cells.length) {
      columnNames.push({ text: headerCell.textContent.trim(), style: 'tableHeader' })
    }
  })

  const rowData = data.map((row) => Object.values(row))
  const documentDefinition = {
    content: [
      {
        text: title,
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      {
        table: {
          headerRows: 1,
          widths: 'auto',
          body: [
            columnNames,
            ...rowData.map((row) => row.map((cell) => ({ text: cell.toString(), noWrap: false })))
          ]
        }
      }
    ],
    styles: {
      tableHeader: {
        bold: true,
        fillColor: '#0e1f87',
        color: 'white',
        alignment: 'center'
      },
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      }
    },
    pageSize:
      columnNames.length > 5
        ? {
            width: 1900,
            height: 1000,
            orientation: 'landscape'
          }
        : {
            width: 612,
            height: 792,
            orientation: 'portrait'
          }
  }
  pdfMake.createPdf(documentDefinition).open()
}

export const formatDocument = (document) => {
  // Verificar si el documento existe y tiene al menos 4 caracteres
  if (document && document.length >= 4) {
    // Insertar un punto después de cada grupo de 3 caracteres, comenzando desde el final
    return document.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  } else {
    return document // Devolver el documento sin cambios si no cumple con los requisitos
  }
}

export const validateNewPassword = (password, invalidFormat) => {
  let mensaje = ''
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$.!%*?&_-])[A-Za-z\d$@.$!%*?&_-]{8,15}/

  if (password === '') {
    mensaje = ''
  } else {
    if (!passwordRegex.test(password)) {
      mensaje = invalidFormat
    }
    return mensaje
  }
}
