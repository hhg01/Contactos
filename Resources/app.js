//conexion a la base de datos para todos los datos
Ti.Database.install('Agenda.sqlite', 'contactos');
var db = Ti.Database.open('contactos');
var query = db.execute('select * from contactos');
var array = [];
while(query.isValidRow()){
	var nombre = query.fieldByName('nombre');
	var apellidopat = query.fieldByName('apellidopat');
	var apellidomat = query.fieldByName('apellidomat');
	var telefono = query.fieldByName('telefono');
	var direccion = query.fieldByName('direccion');
	var email = query.fieldByName('email');
	array.push({
		title:" "+nombre+" "+apellidopat+" "+apellidomat+"\n Tel: "+telefono,
		color: 'black',
		height: 50,
	
	});query.next();
}
var tablaDatos = Titanium.UI.createTableView({
	editable:false
});
tablaDatos.setData(array);

//
var tabGroup = Ti.UI.createTabGroup();

//creo las ventanas asiciadas a las pestañas correspondientes
var ventana1 = Titanium.UI.createWindow({backgroundColor:'white', layout:'vertical'});

//boton que actualiza el registro de la data base
var botActualiza = Titanium.UI.createButton({
   title: 'Ver Datos/Actualizar',
   top: 20,
   width: 200,
   height: 50
});
botActualiza.addEventListener('click',function(e){
	//ventana1.open();
	alert("UPS!! lista no actualizada. Estamos trabajando en esto. Para ver la actualización concluida vuelve a cargar la aplicación");
});
ventana1.add(botActualiza);
ventana1.add(tablaDatos);
var tab1 = Titanium.UI.createTab({window:ventana1, icon:'KS_nav_ui.png', title:'Contactos', backgroundColor:'#F61A1A'});

/***********************************/
var ventana2 = Titanium.UI.createWindow({backgroundColor:'white', layout:'vertical'});
ventana2.add(Ti.UI.createLabel({
  color:'black',
  text: 'Solo escribe el nombre del contacto a eliminar:				',
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  top: 20
}));
var textNombreEliminar = Ti.UI.createTextField({
  color: 'black',
  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  width: 200, height: 40,
  borderColor:'grey',
  top: 20
});
ventana2.add(textNombreEliminar);
//boton que borra el registro de la data base
var botBorrar = Titanium.UI.createButton({
   title: 'Eliminar',
   top: 20,
   width: 100,
   height: 50
});
botBorrar.addEventListener('click',function(e){
	var data = Ti.Database.open('contactos');
	alert("El contacto "+textNombreEliminar.getValue()+" se a eliminado");
	data.execute('DELETE FROM contactos WHERE nombre=?',textNombreEliminar.getValue());
});
ventana2.add(botBorrar);
var tab2 = Titanium.UI.createTab({window:ventana2, icon:'KS_nav_ui.png', title:'Eliminar', backgroundColor:'#F61A1A'});
/**********************************************/

var ventana3 = Titanium.UI.createWindow({backgroundColor:'white', layout:'horizontal'});
//label y textfield del campo de nombre
ventana3.add(Ti.UI.createLabel({
  color:'black',
  text: 'Nombre:				',
  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  top: 20
}));
var textNombre = Ti.UI.createTextField({
  color: 'black',
  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  width: 200, height: 40,
  borderColor:'grey',
  top: 20
});
ventana3.add(textNombre);
//label y textfield del campo de apellidopat
ventana3.add(Ti.UI.createLabel({
  color:'black',
  text: 'Apellido Pat:		',
  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  top:20
}));
var textApat = Ti.UI.createTextField({
  color: 'black',
  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  width: 200, height: 40,
  borderColor:'grey',
  top:20
});
ventana3.add(textApat);
//label y textfield del campo de apellidomat
ventana3.add(Ti.UI.createLabel({
	color:'black',
	text:'Apallido Mat:		',
	top:20
}));
var textAmat = Ti.UI.createTextField({
  color: 'black',
  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  width: 200, height: 40,
  borderColor:'grey',
  top:20
});
ventana3.add(textAmat);
//label y textfield del campo de telefono
ventana3.add(Ti.UI.createLabel({
	color:'black',
	text:'Telefono:				',
	top:20
}));
var textTelef = Ti.UI.createTextField({
  color: 'black',
  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  width: 200, height: 40,
  borderColor:'grey',
  top:20
});
ventana3.add(textTelef);

//boton que inserta los datos a la data base
var botAceptar = Titanium.UI.createButton({
   title: 'Agregar',
   top: 20,
   width: 100,
   height: 50
});
botAceptar.addEventListener('click',function(e){
	var data = Ti.Database.open('contactos');
	alert("Nombre: "+textNombre.getValue()+" "+textApat.getValue()+" "+textAmat.getValue()+"\nTelefono: "+textTelef.getValue()+"\nContacto Agregado");
	data.execute('INSERT INTO contactos (nombre, apellidopat, apellidomat, telefono, direccion, email, favorito, recientes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', textNombre.getValue(), textApat.getValue(),textAmat.getValue(), textTelef.getValue(), "uami", "text@email", "no", 0);
});
ventana3.add(botAceptar);

var tab3 = Titanium.UI.createTab({window:ventana3, icon:'KS_nav_ui.png', title:'Agregar', backgroundColor:'#F61A1A'});

/**
 * Open the tabGroup 3949	5516212834
 */

//agrego las pestañas al tabGroup
tabGroup.addTab(tab1);
tabGroup.addTab(tab3);
tabGroup.addTab(tab2);
tabGroup.open();