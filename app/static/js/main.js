document.addEventListener("DOMContentLoaded", () => {

    
    /* ==========================================
       MODO OSCURO VERDE
       Recordar preferencia del visitante
    ========================================== */

    const darkModeToggle = document.getElementById("darkModeToggle");
    const darkModeIcon = darkModeToggle?.querySelector(".dark-mode-icon");
    const darkModeLabel = darkModeToggle?.querySelector(".dark-mode-label");

    function applyDarkMode(enabled) {
        document.body.classList.toggle("dark-mode", enabled);

        if (darkModeToggle) {
            darkModeToggle.setAttribute("aria-pressed", String(enabled));

            darkModeToggle.setAttribute(
                "aria-label",
                enabled
                    ? "Desactivar modo oscuro verde"
                    : "Activar modo oscuro verde"
            );
        }

        if (darkModeIcon) {
            darkModeIcon.textContent = enabled ? "☀️" : "🌙";
        }

        if (darkModeLabel) {
            darkModeLabel.textContent = enabled
                ? "Modo claro"
                : "Modo oscuro";
        }
    }

    let savedDarkMode = false;

    try {
        savedDarkMode = localStorage.getItem("renace-dark-mode") === "true";
    } catch (error) {
        // La página funciona aunque el almacenamiento esté bloqueado.
    }

    applyDarkMode(savedDarkMode);

    darkModeToggle?.addEventListener("click", () => {
        const enabled = !document.body.classList.contains("dark-mode");

        applyDarkMode(enabled);

        try {
            localStorage.setItem("renace-dark-mode", String(enabled));
        } catch (error) {
            // El modo oscuro seguirá funcionando durante esta visita.
        }
    });


    /* TRADUCCIONES */

    const translations = {
        en: {
            /* MENU */
            "nav.home": "Home",
            "nav.about": "About Us",
            "nav.products": "Products",
            "nav.contact": "Contact",
            "nav.request": "Request",
            "language.english": "English",
            "language.spanish": "Español",
            "menu.open": "Open menu",
            "menu.close": "Close menu",

            /* INICIO */
            "home.hero.label": "Agricultural Producers Association",
            "home.hero.title1": "UNITED FOR",
            "home.hero.title2": "A BETTER FUTURE.",
            "home.hero.description": "We are an association committed to agricultural development, responsible production, and the growth of our producers in Cañete.",
            "home.hero.button": "Discover our products",
            "home.history.label": "Our history",
            "home.history.title1": "Growing together",
            "home.history.title2": "from Cañete.",
            "home.history.text1": "APARC Renace Cañete is an association of agricultural producers committed to the development of our region.",
            "home.history.text2": "We work together with our producers to promote responsible agriculture and create new opportunities.",
            "home.guide.label": "What guides us",
            "home.guide.title1": "Our purpose",
            "home.guide.title2": "every day.",
            "home.guide.description": "We work with commitment, responsibility, and a clear vision for the future of our agricultural community.",
            "home.mission.title": "Mission",
            "home.mission.text": "To promote responsible agricultural production and strengthen the development of our producers.",
            "home.vision.title": "Vision",
            "home.vision.text": "To become a recognized agricultural association that creates sustainable opportunities for Cañete.",
            "home.commitment.title": "Commitment",
            "home.commitment.text": "To work together with our producers while maintaining quality and responsibility in every process.",
            "home.values.label": "Our values",
            "home.values.title": "What defines us",
            "home.values.responsibility": "Responsibility",
            "home.values.responsibilityText": "We act responsibly with our producers, customers, and community.",
            "home.work.label": "Our work",
            "home.work.title": "Agriculture that creates opportunities.",

            /* NOSOTROS */
            "about.hero.label": "ABOUT US",
            "about.hero.title": "About Us",
            "about.hero.subtitle": "Discover who we are.",
            "about.hero.description": "We are an association of agricultural producers committed to the development of Cañete and the growth of our producers.",
            "about.who.label": "Who we are",
            "about.who.title1": "An association",
            "about.who.title2": "with purpose.",
            "about.who.text1": "APARC Renace Cañete brings together agricultural producers who share a commitment to quality, responsible production, and regional development.",
            "about.who.text2": "Our work is focused on creating new opportunities for our producers and strengthening the agricultural activity of Cañete.",
            "about.purpose.label": "Our purpose",
            "about.purpose.title": "What drives us",
            "about.organization.title": "Organization",
            "about.organization.text": "We work in an organized and coordinated way with our agricultural producers.",
            "about.quality.title": "Quality",
            "about.quality.text": "We value quality in our agricultural products and in every stage of our work.",
            "about.development.title": "Development",
            "about.development.text": "We promote agricultural development and new opportunities for our community.",
            "about.work.label": "Our work",
            "about.work.title": "Working together for Cañete.",

            
            /* PRODUCTOS: textos adicionales */
            "products.catalog.label": "Catalog",
            "products.catalog.title": "Our Products",
            "products.catalog.description": "Updated information about products available for commercial orders.",
            "products.category": "Agricultural product",
            "products.price": "Price",
            "products.presentation": "Packaging",
            "products.request": "Request product",
            "products.empty.title": "We are updating our catalog.",
            "products.empty.description": "We will publish our available products soon.",
            "products.cta.label": "Do you need our products?",
            "products.cta.title": "Let's grow new opportunities.",
            "products.cta.description": "If you are a company, association, or business and would like to place an order, send us your request.",
            "products.cta.button": "Submit a request",


            /* CONTACTO */
            "contact.hero.label": "WE ARE HERE TO HELP",
            "contact.hero.title1": "Let's talk and",
            "contact.hero.title2": "grow together.",
            "contact.hero.description": "If you want to learn about our products, make an inquiry, or establish a business relationship, we are ready to listen.",
            "contact.info.label": "CONTACT US",
            "contact.info.title1": "We are close",
            "contact.info.title2": "to you.",
            "contact.info.description": "You can contact APARC Renace Cañete for information about our products, inquiries, or business opportunities.",
            "contact.location.label": "Location",
            "contact.location.title": "Cañete, Lima",
            "contact.location.description": "Province of Cañete, Lima region, Peru.",
            "contact.email.label": "Email",
            "contact.email.title": "Write to us",
            "contact.email.description": "We will be attentive to your inquiry and request.",
            "contact.attention.label": "Attention",
            "contact.attention.title": "Business service",
            "contact.attention.description": "Inquiries and requests from companies and associations.",
            "contact.map.label": "Our location",
            "contact.map.title": "Find us in Cañete",
            "contact.map.description": "Visit us at our location in CPM La Encañada, San Vicente de Cañete.",
            "contact.map.button": "View location on Google Maps",
            "contact.form.label": "WRITE TO US",
            "contact.form.title": "Send us a message",
            "contact.form.description": "Complete the form and we will contact you.",
            "contact.form.name": "Name",
            "contact.form.namePlaceholder": "Your name",
            "contact.form.company": "Company or association",
            "contact.form.companyPlaceholder": "Company or association name",
            "contact.form.email": "Email",
            "contact.form.emailPlaceholder": "email@example.com",
            "contact.form.phone": "Phone",
            "contact.form.phonePlaceholder": "999 999 999",
            "contact.form.subject": "Subject",
            "contact.form.subjectSelect": "Select an option",
            "contact.form.subjectProducts": "Product information",
            "contact.form.subjectOrder": "Order request",
            "contact.form.subjectCommercial": "Business inquiry",
            "contact.form.subjectOther": "Other",
            "contact.form.message": "Message",
            "contact.form.messagePlaceholder": "Tell us how we can help you...",
            "contact.form.submit": "Send message",

            /* SOLICITUD */
            "request.hero.label": "BUSINESS REQUEST",
            "request.hero.title": "Request our products",
            "request.hero.description": "Request APARC agricultural products for your company or association.",
            "request.info.label": "WHOLESALE ORDERS",
            "request.info.title": "Product request",
            "request.info.description1": "At APARC, we work with companies and associations looking for quality agricultural products from Cañete.",
            "request.info.description2": "Complete the form indicating the product and quantity you need. Our team will review your request and contact you.",
            "request.benefit.products": "Products from Cañete",
            "request.benefit.productsDescription": "Agricultural production from our region.",
            "request.benefit.orders": "Orders by kilogram",
            "request.benefit.ordersDescription": "Indicate the quantity your organization needs.",
            "request.benefit.attention": "Business service",
            "request.benefit.attentionDescription": "We coordinate the details of your request with you.",
            "request.form.label": "FORM",
            "request.form.title": "Make your request",
            "request.form.description": "Complete your information to request our products.",
            "request.form.company": "Company or association",
            "request.form.companyPlaceholder": "Company or association name",
            "request.form.ruc": "RUC",
            "request.form.rucPlaceholder": "E.g. 20123456789",
            "request.form.contact": "Contact person",
            "request.form.contactPlaceholder": "Name of the person in charge",
            "request.form.phone": "Phone",
            "request.form.phonePlaceholder": "Contact number",
            "request.form.email": "Email",
            "request.form.emailPlaceholder": "email@company.com",
            "request.form.product": "Product",
            "request.form.productSelect": "Select a product",
            "request.form.quantity": "Requested quantity (kg)",
            "request.form.quantityPlaceholder": "E.g. 500",
            "request.form.date": "Estimated delivery date",
            "request.form.details": "Additional details",
            "request.form.detailsPlaceholder": "Write any specifications about your request...",
            "request.form.submit": "Send request",

            /* CHATBOT */
            "chatbot.name": "APARC Assistant",
            "chatbot.online": "Online",
            "chatbot.welcome": "Hello! Welcome to APARC Renace Cañete. How can I help you?",
            "chatbot.products": "Products",
            "chatbot.contact": "Contact",
            "chatbot.request": "Request",
            "chatbot.placeholder": "Write your message...",
            "chatbot.send": "Send",

            /* CLAVES ADICIONALES */
            "about.who.title": "United to grow and build new opportunities.",
            "about.who.imageAlt": "APARC Renace Cañete producers",
            "about.purpose.organization.title": "Organization",
            "about.purpose.organization.text": "We strengthen cooperation and coordination among our producers.",
            "about.purpose.quality.title": "Quality",
            "about.purpose.quality.text": "We work to provide responsible, high-quality agricultural products.",
            "about.purpose.development.title": "Development",
            "about.purpose.development.text": "We seek to create better opportunities for our producers and their families.",
            "about.work.description": "Every day represents our producers' hard work and commitment to developing responsible agriculture in Cañete.",
            "about.work.imageAlt": "Agricultural work in Cañete",
            "products.intro.title": "Farm-fresh quality, straight to your table.",
            "products.offer.label": "What we offer",
            "products.offer.title": "Our products",
            "products.offer.description": "Discover our current selection and request information about purchases or commercial orders.",
            "products.grape.badge": "Fresh product",
            "products.grape.category": "Fruit",
            "products.grape.title": "Italia Grapes",
            "products.grape.description": "Italia grapes grown by our members in Cañete, selected to offer a fresh, high-quality product.",
            "products.grape.imageAlt": "Italia grapes from APARC Renace Cañete",
            "products.raisin.badge": "Agricultural product",
            "products.raisin.category": "Dried fruit",
            "products.raisin.title": "Raisins",
            "products.raisin.description": "Raisins from our farmers' production, suitable for different uses and preparations.",
            "products.raisin.imageAlt": "Raisins from APARC Renace Cañete",
            "products.presentation": "Packaging",
            "products.perKilo": "Sold by kilogram",
            "products.origin": "Origin",
            "products.canete": "Cañete",
            "products.request": "Request product",
            "products.cta.label": "Commercial opportunities",
            "products.cta.title": "Let's build new opportunities together.",
            "products.cta.description": "If you are a company, association, or business interested in placing an order, send us your request.",
            "products.cta.button": "Submit a request",
            "contact.cta.label": "APARC RENACE CAÑETE",
            "contact.cta.title1": "Let's build",
            "contact.cta.title2": "new opportunities.",
            "contact.cta.description": "We work alongside our producers to strengthen agriculture and create new business opportunities.",
            "footer.association": "Agricultural Producers Association",
            "footer.contact": "Contact",
            "footer.description": "An agricultural producers association committed to the development of Cañete.",
            "footer.location": "Cañete, Lima, Peru",
            "footer.rights": "All rights reserved.",
            "home.carousel.image1": "Agricultural production in Cañete",
            "home.carousel.image2": "Fresh agricultural products",
            "home.carousel.image3": "Work of our producers",
            "home.carousel.next": "Next image",
            "home.carousel.prev": "Previous image",
            "home.guide.title": "Explore our website",
            "home.history.imageAlt": "Agricultural harvest in Cañete",
            "home.history.title3": "Our commitment to agriculture",
            "home.values.communication": "Communication",
            "home.values.communicationText": "We encourage collaboration and communication among our producers.",
            "home.values.quality": "Quality",
            "home.values.qualityText": "We work to offer agricultural products with care and responsibility.",
            "home.values.imageAlt": "Agricultural producers working together",
            "request.bottom.label": "APARC RENACE CAÑETE",
            "request.bottom.title": "Let's work together",
            "request.bottom.description": "Tell us which products you need, and we will coordinate the next steps with you."
        },

        es: {
            /* MENU */
            "nav.home": "Inicio",
            "nav.about": "Nosotros",
            "nav.products": "Productos",
            "nav.contact": "Contacto",
            "nav.request": "Solicitud",
            "language.english": "English",
            "language.spanish": "Español",
            "menu.open": "Abrir menú",
            "menu.close": "Cerrar menú",

            /* INICIO */
            "home.hero.label": "Asociación de Productores Agrarios",
            "home.hero.title1": "UNIDOS POR",
            "home.hero.title2": "UN BIEN MEJOR.",
            "home.hero.description": "Somos una asociación comprometida con el desarrollo agrícola, la producción responsable y el crecimiento de nuestros productores en Cañete.",
            "home.hero.button": "Conoce nuestros productos",
            "home.history.label": "Nuestra historia",
            "home.history.title1": "Creciendo juntos",
            "home.history.title2": "desde Cañete.",
            "home.history.text1": "APARC Renace Cañete es una asociación de productores agrarios comprometida con el desarrollo de nuestra región.",
            "home.history.text2": "Trabajamos junto a nuestros productores para impulsar una agricultura responsable y crear nuevas oportunidades.",
            "home.guide.label": "Lo que nos guía",
            "home.guide.title1": "Nuestro propósito",
            "home.guide.title2": "cada día.",
            "home.guide.description": "Trabajamos con compromiso, responsabilidad y una visión clara para el futuro de nuestra comunidad agrícola.",
            "home.mission.title": "Misión",
            "home.mission.text": "Promover una producción agrícola responsable y fortalecer el desarrollo de nuestros productores.",
            "home.vision.title": "Visión",
            "home.vision.text": "Ser una asociación agrícola reconocida que genere oportunidades sostenibles para Cañete.",
            "home.commitment.title": "Compromiso",
            "home.commitment.text": "Trabajar junto a nuestros productores manteniendo calidad y responsabilidad en cada proceso.",
            "home.values.label": "Nuestros valores",
            "home.values.title": "Lo que nos define",
            "home.values.responsibility": "Responsabilidad",
            "home.values.responsibilityText": "Actuamos responsablemente con nuestros productores, clientes y comunidad.",
            "home.work.label": "Nuestro trabajo",
            "home.work.title": "Agricultura que crea oportunidades.",

            /* NOSOTROS */
            "about.hero.label": "NOSOTROS",
            "about.hero.title": "Nosotros",
            "about.hero.subtitle": "Conoce quiénes somos.",
            "about.hero.description": "Somos una asociación de productores agrarios comprometida con el desarrollo de Cañete y el crecimiento de nuestros productores.",
            "about.who.label": "Quiénes somos",
            "about.who.title1": "Una asociación",
            "about.who.title2": "con propósito.",
            "about.who.text1": "APARC Renace Cañete reúne a productores agrarios que comparten un compromiso con la calidad, la producción responsable y el desarrollo regional.",
            "about.who.text2": "Nuestro trabajo está enfocado en crear nuevas oportunidades para nuestros productores y fortalecer la actividad agrícola de Cañete.",
            "about.purpose.label": "Nuestro propósito",
            "about.purpose.title": "Lo que nos impulsa",
            "about.organization.title": "Organización",
            "about.organization.text": "Trabajamos de manera organizada y coordinada con nuestros productores agrarios.",
            "about.quality.title": "Calidad",
            "about.quality.text": "Valoramos la calidad de nuestros productos agrícolas y de cada etapa de nuestro trabajo.",
            "about.development.title": "Desarrollo",
            "about.development.text": "Impulsamos el desarrollo agrícola y nuevas oportunidades para nuestra comunidad.",
            "about.work.label": "Nuestro trabajo",
            "about.work.title": "Trabajando juntos por Cañete.",

            
            /* PRODUCTOS: textos adicionales */
            "products.catalog.label": "Catálogo",
            "products.catalog.title": "Nuestros productos",
            "products.catalog.description": "Información actualizada de productos disponibles para pedidos comerciales.",
            "products.category": "Producto agrícola",
            "products.price": "Precio",
            "products.presentation": "Presentación",
            "products.request": "Solicitar producto",
            "products.empty.title": "Estamos actualizando nuestro catálogo.",
            "products.empty.description": "Pronto publicaremos nuestros productos disponibles.",
            "products.cta.label": "¿Necesitas nuestros productos?",
            "products.cta.title": "Hagamos crecer nuevas oportunidades.",
            "products.cta.description": "Si eres una empresa, asociación o negocio y deseas realizar un pedido, envíanos tu solicitud.",
            "products.cta.button": "Realizar una solicitud",


            /* CONTACTO */
            "contact.hero.label": "ESTAMOS PARA AYUDARTE",
            "contact.hero.title1": "Hablemos y",
            "contact.hero.title2": "crezcamos juntos.",
            "contact.hero.description": "Si deseas conocer nuestros productos, realizar una consulta o establecer una relación comercial, estamos listos para escucharte.",
            "contact.info.label": "CONTÁCTANOS",
            "contact.info.title1": "Estamos cerca",
            "contact.info.title2": "de ti.",
            "contact.info.description": "Puedes comunicarte con APARC Renace Cañete para solicitar información sobre nuestros productos, realizar consultas o conversar sobre oportunidades comerciales.",
            "contact.location.label": "Ubicación",
            "contact.location.title": "Cañete, Lima",
            "contact.location.description": "Provincia de Cañete, región Lima, Perú.",
            "contact.email.label": "Correo electrónico",
            "contact.email.title": "Escríbenos",
            "contact.email.description": "Estaremos atentos a tu consulta y solicitud.",
            "contact.attention.label": "Atención",
            "contact.attention.title": "Atención comercial",
            "contact.attention.description": "Consultas y solicitudes de empresas y asociaciones.",
            "contact.map.label": "Nuestra ubicación",
            "contact.map.title": "Encuéntranos en Cañete",
            "contact.map.description": "Visítanos en nuestra ubicación de CPM La Encañada, San Vicente de Cañete.",
            "contact.map.button": "Ver ubicación en Google Maps",
            "contact.form.label": "ESCRÍBENOS",
            "contact.form.title": "Envíanos un mensaje",
            "contact.form.description": "Completa el formulario y nos pondremos en contacto contigo.",
            "contact.form.name": "Nombre",
            "contact.form.namePlaceholder": "Tu nombre",
            "contact.form.company": "Empresa o asociación",
            "contact.form.companyPlaceholder": "Nombre de la empresa o asociación",
            "contact.form.email": "Correo electrónico",
            "contact.form.emailPlaceholder": "correo@ejemplo.com",
            "contact.form.phone": "Teléfono",
            "contact.form.phonePlaceholder": "999 999 999",
            "contact.form.subject": "Asunto",
            "contact.form.subjectSelect": "Selecciona una opción",
            "contact.form.subjectProducts": "Información sobre productos",
            "contact.form.subjectOrder": "Solicitud de pedido",
            "contact.form.subjectCommercial": "Consulta comercial",
            "contact.form.subjectOther": "Otro",
            "contact.form.message": "Mensaje",
            "contact.form.messagePlaceholder": "Cuéntanos cómo podemos ayudarte...",
            "contact.form.submit": "Enviar mensaje",

            /* SOLICITUD */
            "request.hero.label": "SOLICITUD COMERCIAL",
            "request.hero.title": "Solicita nuestros productos",
            "request.hero.description": "Realiza tu solicitud de productos agrícolas de APARC para tu empresa o asociación.",
            "request.info.label": "PEDIDOS POR MAYOR",
            "request.info.title": "Solicitud de productos",
            "request.info.description1": "En APARC trabajamos con empresas y asociaciones que buscan productos agrícolas de calidad provenientes de Cañete.",
            "request.info.description2": "Completa el formulario indicando el producto y la cantidad que necesitas. Nuestro equipo podrá revisar tu solicitud y ponerse en contacto contigo.",
            "request.benefit.products": "Productos de Cañete",
            "request.benefit.productsDescription": "Producción agrícola de nuestra región.",
            "request.benefit.orders": "Pedidos por kilogramos",
            "request.benefit.ordersDescription": "Indica la cantidad que necesita tu organización.",
            "request.benefit.attention": "Atención comercial",
            "request.benefit.attentionDescription": "Coordinamos contigo los detalles de tu solicitud.",
            "request.form.label": "FORMULARIO",
            "request.form.title": "Realiza tu solicitud",
            "request.form.description": "Completa tus datos para solicitar nuestros productos.",
            "request.form.company": "Empresa o asociación",
            "request.form.companyPlaceholder": "Nombre de la empresa o asociación",
            "request.form.ruc": "RUC",
            "request.form.rucPlaceholder": "Ej. 20123456789",
            "request.form.contact": "Persona de contacto",
            "request.form.contactPlaceholder": "Nombre del responsable",
            "request.form.phone": "Teléfono",
            "request.form.phonePlaceholder": "Número de contacto",
            "request.form.email": "Correo electrónico",
            "request.form.emailPlaceholder": "correo@empresa.com",
            "request.form.product": "Producto",
            "request.form.productSelect": "Selecciona un producto",
            "request.form.quantity": "Cantidad solicitada (kg)",
            "request.form.quantityPlaceholder": "Ej. 500",
            "request.form.date": "Fecha aproximada de entrega",
            "request.form.details": "Detalles adicionales",
            "request.form.detailsPlaceholder": "Escribe alguna especificación sobre tu solicitud...",
            "request.form.submit": "Enviar solicitud",

            /* CHATBOT */
            "chatbot.name": "Asistente APARC",
            "chatbot.online": "En línea",
            "chatbot.welcome": "¡Hola! Bienvenido a APARC Renace Cañete. ¿Cómo puedo ayudarte?",
            "chatbot.products": "Productos",
            "chatbot.contact": "Contacto",
            "chatbot.request": "Solicitud",
            "chatbot.placeholder": "Escribe tu mensaje...",
            "chatbot.send": "Enviar",

            /* CLAVES ADICIONALES */
            "about.who.title": "Unidos para crecer y construir nuevas oportunidades.",
            "about.who.imageAlt": "Productores de APARC Renace Cañete",
            "about.purpose.organization.title": "Organización",
            "about.purpose.organization.text": "Fortalecemos la unión y coordinación entre nuestros productores.",
            "about.purpose.quality.title": "Calidad",
            "about.purpose.quality.text": "Trabajamos para ofrecer productos agrícolas responsables y de calidad.",
            "about.purpose.development.title": "Desarrollo",
            "about.purpose.development.text": "Buscamos generar mejores oportunidades para nuestros productores y sus familias.",
            "about.work.description": "Cada jornada representa el esfuerzo de nuestros productores y el compromiso de desarrollar una agricultura responsable en Cañete.",
            "about.work.imageAlt": "Trabajo agrícola en Cañete",
            "products.intro.title": "Calidad del campo directo a tu mesa.",
            "products.offer.label": "Lo que ofrecemos",
            "products.offer.title": "Nuestros productos",
            "products.offer.description": "Conoce nuestra oferta actual y solicita información para realizar una compra o pedido comercial.",
            "products.grape.badge": "Producto fresco",
            "products.grape.category": "Fruta",
            "products.grape.title": "Uva Italia",
            "products.grape.description": "Uva Italia producida por nuestros asociados en Cañete, seleccionada para ofrecer un producto fresco y de calidad.",
            "products.grape.imageAlt": "Uva Italia de APARC Renace Cañete",
            "products.raisin.badge": "Producto agrícola",
            "products.raisin.category": "Fruto deshidratado",
            "products.raisin.title": "Pasas",
            "products.raisin.description": "Pasas obtenidas de la producción de nuestros agricultores, ideales para diferentes usos y preparaciones.",
            "products.raisin.imageAlt": "Pasas de APARC Renace Cañete",
            "products.presentation": "Presentación",
            "products.perKilo": "Por kilos",
            "products.origin": "Origen",
            "products.canete": "Cañete",
            "products.request": "Solicitar producto",
            "products.cta.label": "Oportunidades comerciales",
            "products.cta.title": "Construyamos nuevas oportunidades juntos.",
            "products.cta.description": "Si eres una empresa, asociación o negocio interesado en realizar un pedido, envíanos tu solicitud.",
            "products.cta.button": "Realizar una solicitud",
            "contact.cta.label": "APARC RENACE CAÑETE",
            "contact.cta.title1": "Construyamos",
            "contact.cta.title2": "nuevas oportunidades.",
            "contact.cta.description": "Trabajamos junto a nuestros productores para fortalecer la agricultura y generar nuevas oportunidades comerciales.",
            "footer.association": "Asociación de Productores Agrarios",
            "footer.contact": "Contacto",
            "footer.description": "Asociación de productores agrarios comprometida con el desarrollo de Cañete.",
            "footer.location": "Cañete, Lima, Perú",
            "footer.rights": "Todos los derechos reservados.",
            "home.carousel.image1": "Producción agrícola en Cañete",
            "home.carousel.image2": "Productos agrícolas frescos",
            "home.carousel.image3": "Trabajo de nuestros productores",
            "home.carousel.next": "Imagen siguiente",
            "home.carousel.prev": "Imagen anterior",
            "home.guide.title": "Explora nuestra página",
            "home.history.imageAlt": "Cosecha agrícola en Cañete",
            "home.history.title3": "Nuestro compromiso con la agricultura",
            "home.values.communication": "Comunicación",
            "home.values.communicationText": "Promovemos la colaboración y comunicación entre nuestros productores.",
            "home.values.quality": "Calidad",
            "home.values.qualityText": "Trabajamos para ofrecer productos agrícolas con cuidado y responsabilidad.",
            "home.values.imageAlt": "Productores agrícolas trabajando juntos",
            "request.bottom.label": "APARC RENACE CAÑETE",
            "request.bottom.title": "Trabajemos juntos",
            "request.bottom.description": "Cuéntanos qué productos necesitas y coordinaremos contigo los siguientes pasos."
        }
    };

    /* ==============================
       MENU RESPONSIVE
    ============================== */

    const menuToggle = document.getElementById("menu-toggle");
    const mainMenu = document.getElementById("main-menu");

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener("click", () => {
            mainMenu.classList.toggle("active");

            const abierto = mainMenu.classList.contains("active");
            const language = localStorage.getItem("renaceLanguage") || "en";
            const texts = translations[language];

            menuToggle.setAttribute("aria-expanded", abierto);
            menuToggle.setAttribute(
                "aria-label",
                abierto ? texts["menu.close"] : texts["menu.open"]
            );
        });
    }

    /* ==============================
       CARRUSEL
    ============================== */

    const images = document.querySelectorAll(".carousel-image");
    const prevButton = document.getElementById("carousel-prev");
    const nextButton = document.getElementById("carousel-next");
    let currentImage = 0;

    function showImage(index) {
        images.forEach((image) => image.classList.remove("active"));

        if (images[index]) {
            images[index].classList.add("active");
        }
    }

    if (images.length > 0) {
        showImage(currentImage);

        nextButton?.addEventListener("click", () => {
            currentImage++;

            if (currentImage >= images.length) {
                currentImage = 0;
            }

            showImage(currentImage);
        });

        prevButton?.addEventListener("click", () => {
            currentImage--;

            if (currentImage < 0) {
                currentImage = images.length - 1;
            }

            showImage(currentImage);
        });
    }

    /* ==============================
       CAMBIAR IDIOMA
    ============================== */

    function changeLanguage(language) {
        const texts = translations[language];

        if (!texts) return;

        /* Textos */
        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.getAttribute("data-i18n");

            // Si el elemento tiene textos procedentes de MySQL,
            // usamos el texto correspondiente al idioma seleccionado.
            const textoBD = element.getAttribute(
                language === "es" ? "data-db-es" : "data-db-en"
            );

            if (textoBD !== null) {
                element.textContent = textoBD;
            } else if (texts[key]) {
                // Las demás secciones conservan el traductor actual.
                element.textContent = texts[key];
            }
        });

        /* Placeholders */
        document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
            const key = element.getAttribute("data-i18n-placeholder");

            if (Object.prototype.hasOwnProperty.call(texts, key)) {
                element.placeholder = texts[key];
            }
        });

        /* Texto alternativo de imágenes */
        document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
            const key = element.getAttribute("data-i18n-alt");

            if (Object.prototype.hasOwnProperty.call(texts, key)) {
                element.setAttribute("alt", texts[key]);
            }
        });

        /* Etiquetas accesibles */
        document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
            const key = element.getAttribute("data-i18n-aria");

            if (Object.prototype.hasOwnProperty.call(texts, key)) {
                element.setAttribute("aria-label", texts[key]);
            }
        });

        /* Idioma del HTML */
        document.documentElement.lang = language;

        /* Guardar idioma */
        localStorage.setItem("renaceLanguage", language);

        /* Botón */
        const languageToggle = document.getElementById("languageToggle");

        const currentLanguage = document.getElementById("currentLanguage");

        if (currentLanguage) {
            currentLanguage.textContent = language === "en" ? "EN" : "ES";
        }

        /* Menú */
        const menuButton = document.getElementById("menu-toggle");

        if (menuButton) {
            const abierto = menuButton.getAttribute("aria-expanded") === "true";

            menuButton.setAttribute(
                "aria-label",
                abierto ? texts["menu.close"] : texts["menu.open"]
            );
        }
    }

    /* ==============================
       SELECTOR DE IDIOMA
    ============================== */

    const languageToggle = document.getElementById("languageToggle");
    const languageMenu = document.getElementById("languageMenu");

    if (languageToggle && languageMenu) {
        languageToggle.addEventListener("click", (event) => {
            event.stopPropagation();
            languageMenu.classList.toggle("active");
        });

        languageMenu.querySelectorAll("[data-lang]").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();

                const language = button.getAttribute("data-lang");
                changeLanguage(language);
                languageMenu.classList.remove("active");
            });
        });

        document.addEventListener("click", () => {
            languageMenu.classList.remove("active");
        });
    }

    /* ==============================
       IDIOMA INICIAL
    ============================== */

    const savedLanguage = localStorage.getItem("renaceLanguage") || "es";

    const initialLanguage =
        savedLanguage === "es" || savedLanguage === "en"
            ? savedLanguage
            : "es";

    changeLanguage(initialLanguage);

    /* ==============================
       CHATBOT
    ============================== */

    const chatbotButton = document.getElementById("chatbot-button");
    const chatbotWindow = document.getElementById("chatbot-window");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotForm = document.getElementById("chatbot-form");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");

    /* Abrir */
    chatbotButton?.addEventListener("click", () => {
        chatbotWindow?.classList.toggle("active");
    });

    /* Cerrar */
    chatbotClose?.addEventListener("click", () => {
        chatbotWindow?.classList.remove("active");
    });

    /* Añadir mensaje */
    function addChatMessage(message, type) {
        if (!chatbotMessages) return;

        const div = document.createElement("div");
        div.classList.add("chatbot-message", type);
        div.textContent = message;

        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    /* Respuestas */
    function getBotResponse(message) {
        const language = localStorage.getItem("renaceLanguage") || "en";
        const text = message.toLowerCase().trim();

        if (
            text.includes("producto") ||
            text.includes("product") ||
            text.includes("uva") ||
            text.includes("grape")
        ) {
            return language === "es"
                ? "Actualmente ofrecemos productos agrícolas de Cañete, incluyendo Uva Italia. Puedes visitar la sección Productos para conocer más."
                : "We currently offer agricultural products from Cañete, including Italia grapes. You can visit the Products section to learn more.";
        }

        if (
            text.includes("contact") ||
            text.includes("contacto") ||
            text.includes("correo") ||
            text.includes("email") ||
            text.includes("telefono") ||
            text.includes("teléfono")
        ) {
            return language === "es"
                ? "Puedes comunicarte con APARC Renace Cañete desde la sección Contacto."
                : "You can contact APARC Renace Cañete through the Contact section.";
        }

        if (
            text.includes("solicitud") ||
            text.includes("pedido") ||
            text.includes("request") ||
            text.includes("order")
        ) {
            return language === "es"
                ? "Puedes realizar una solicitud comercial desde la sección Solicitud. Allí podrás indicar el producto y la cantidad que necesitas."
                : "You can make a business request from the Request section. You can indicate the product and quantity you need.";
        }

        if (
            text.includes("aparc") ||
            text.includes("empresa") ||
            text.includes("association") ||
            text.includes("asociación")
        ) {
            return language === "es"
                ? "APARC Renace Cañete es una asociación de productores agrarios comprometida con el desarrollo agrícola de Cañete."
                : "APARC Renace Cañete is an agricultural producers association committed to the development of Cañete.";
        }

        return language === "es"
            ? "Gracias por escribirnos. Puedo ayudarte con información sobre productos, contacto y solicitudes comerciales."
            : "Thank you for contacting us. I can help you with information about products, contact details, and business requests.";
    }

    /* Enviar mensaje */
    chatbotForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!chatbotInput) return;

        const message = chatbotInput.value.trim();

        if (!message) return;

        addChatMessage(message, "user");
        chatbotInput.value = "";

        setTimeout(() => {
            const response = getBotResponse(message);
            addChatMessage(response, "bot");
        }, 400);
    });

    /* Botones rápidos */
    document.querySelectorAll(".chat-option").forEach((button) => {
        button.addEventListener("click", () => {
            const question = button.getAttribute("data-question");
            const language = localStorage.getItem("renaceLanguage") || "en";
            let message = "";

            if (question === "products") {
                message =
                    language === "es"
                        ? "Quiero información sobre sus productos"
                        : "I want information about your products";
            }

            if (question === "contact") {
                message =
                    language === "es"
                        ? "¿Cómo puedo contactarlos?"
                        : "How can I contact you?";
            }

            if (question === "request") {
                message =
                    language === "es"
                        ? "Quiero realizar una solicitud"
                        : "I want to make a request";
            }

            if (!message) return;

            addChatMessage(message, "user");

            setTimeout(() => {
                addChatMessage(getBotResponse(message), "bot");
            }, 400);
        });
    });

    /* ==============================
       ANIMACIONES
    ============================== */

    const animatedElements = document.querySelectorAll(
        ".nosotros-animate, .productos-animate, .contacto-animate, .solicitud-animate"
    );

    if (animatedElements.length > 0 && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        animatedElements.forEach((element) => {
            observer.observe(element);
        });

    }

        /* =========================================
       VENTANA FLOTANTE DE VALIDACIÓN
    ========================================= */

    const validationModal = document.getElementById("validation-modal");
    const validationCard = document.getElementById("validation-card");
    const validationIcon = document.getElementById("validation-icon");
    const validationTitle = document.getElementById("validation-title");
    const validationMessage = document.getElementById("validation-message");
    const validationButton = document.getElementById("validation-button");
    const validationClose = document.getElementById("validation-close");

    let previousFocus = null;

    function getValidationLanguage() {
        return localStorage.getItem("renaceLanguage") || "en";
    }

    function showValidation(type, customMessage = "") {
        if (!validationModal) return;

        const language = getValidationLanguage();

        const messages = {
            en: {
                successTitle: "Data sent successfully!",
                successMessage: "Your information has been saved successfully.",
                errorTitle: "Data not accepted",
                errorMessage: "We could not save your information. Please try again.",
                warningTitle: "Check your information",
                warningMessage: "Some fields are incomplete or contain invalid information.",
                loadingTitle: "Sending information...",
                loadingMessage: "Please wait while we process your information.",
                accept: "Accept",
                close: "Close"
            },
            es: {
                successTitle: "¡Datos enviados correctamente!",
                successMessage: "Tu información se ha guardado correctamente.",
                errorTitle: "Datos no aceptados",
                errorMessage: "No pudimos guardar tu información. Inténtalo nuevamente.",
                warningTitle: "Revisa tus datos",
                warningMessage: "Hay campos incompletos o información no válida.",
                loadingTitle: "Enviando información...",
                loadingMessage: "Espera mientras procesamos tus datos.",
                accept: "Aceptar",
                close: "Cerrar"
            }
        };

        const text = messages[language] || messages.en;

        previousFocus = document.activeElement;

        validationCard.classList.remove("success", "error", "warning", "loading");
        validationCard.classList.add(type);

        if (type === "success") {
            validationIcon.textContent = "✓";
            validationTitle.textContent = text.successTitle;
            validationMessage.textContent = customMessage || text.successMessage;
        } else if (type === "error") {
            validationIcon.textContent = "✕";
            validationTitle.textContent = text.errorTitle;
            validationMessage.textContent = customMessage || text.errorMessage;
        } else if (type === "warning") {
            validationIcon.textContent = "!";
            validationTitle.textContent = text.warningTitle;
            validationMessage.textContent = customMessage || text.warningMessage;
        } else {
            validationIcon.textContent = "…";
            validationTitle.textContent = text.loadingTitle;
            validationMessage.textContent = customMessage || text.loadingMessage;
        }

        validationButton.textContent = text.accept;
        validationClose.setAttribute("aria-label", text.close);

        validationModal.classList.add("active");
        validationModal.setAttribute("aria-hidden", "false");

        validationButton.focus();
    }

    function hideValidation() {
        if (!validationModal) return;

        validationModal.classList.remove("active");
        validationModal.setAttribute("aria-hidden", "true");

        if (previousFocus && typeof previousFocus.focus === "function") {
            previousFocus.focus();
        }
    }

    validationButton?.addEventListener("click", hideValidation);
    validationClose?.addEventListener("click", hideValidation);

    validationModal?.addEventListener("click", (event) => {
        if (event.target === validationModal) {
            hideValidation();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            validationModal?.classList.contains("active")
        ) {
            hideValidation();
        }
    });

    /* Mostrar el resultado enviado por Flask */

    if (validationModal) {
        const serverStatus = validationModal.dataset.status;
        const serverMessage = validationModal.dataset.message;

        if (serverStatus === "success") {
            showValidation("success");
        } else if (serverStatus === "error") {
            showValidation(
                "error",
                serverMessage || undefined
            );
        }
    }

    /* Validación de formularios */

    document.querySelectorAll(".contacto-form, .solicitud-form").forEach((form) => {
        form.addEventListener("submit", (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();

                showValidation(
                    "warning",
                    getValidationLanguage() === "es"
                        ? "Completa los campos obligatorios y revisa que los datos sean correctos."
                        : "Complete the required fields and check that your information is valid."
                );

                form.reportValidity();
                return;
            }

            /* Validaciones adicionales para la solicitud comercial */

            if (form.classList.contains("solicitud-form")) {
                const ruc = form.querySelector('[name="ruc"]');
                const cantidad = form.querySelector('[name="cantidad"]');
                const telefono = form.querySelector('[name="telefono"]');

                if (ruc && !/^\d{11}$/.test(ruc.value.trim())) {
                    event.preventDefault();
                    ruc.focus();

                    showValidation(
                        "warning",
                        getValidationLanguage() === "es"
                            ? "El RUC debe contener exactamente 11 números."
                            : "The RUC must contain exactly 11 digits."
                    );
                    return;
                }

                if (cantidad && Number(cantidad.value) <= 0) {
                    event.preventDefault();
                    cantidad.focus();

                    showValidation(
                        "warning",
                        getValidationLanguage() === "es"
                            ? "La cantidad solicitada debe ser mayor que cero."
                            : "The requested quantity must be greater than zero."
                    );
                    return;
                }

                if (telefono && !/^[0-9+\s()-]{7,20}$/.test(telefono.value.trim())) {
                    event.preventDefault();
                    telefono.focus();

                    showValidation(
                        "warning",
                        getValidationLanguage() === "es"
                            ? "Introduce un número de teléfono válido."
                            : "Enter a valid phone number."
                    );
                    return;
                }
            }

            /* No bloqueamos el envío válido.
               Flask procesará los datos y mostrará el resultado. */

        });
    });

        /* =========================================
    CONFIRMACIÓN Y VALIDACIÓN DE FORMULARIOS
    ========================================= */

    const confirmModal = document.getElementById("confirm-data-modal");
    const confirmDataList = document.getElementById("confirm-data-list");
    const editDataButton = document.getElementById("edit-data-button");
    const sendDataButton = document.getElementById("send-data-button");

    let currentFormToSend = null;

    function obtenerNombreCampo(campo, formulario) {
        const etiqueta = Array.from(formulario.querySelectorAll("label"))
            .find(label => label.htmlFor === campo.id);

        if (etiqueta) {
            return etiqueta.textContent.trim().replace(/\s+/g, " ");
        }

        return campo.getAttribute("placeholder") || campo.name || "Campo sin nombre";
    }

    function validarFormulario(formulario) {
        const campos = Array.from(
            formulario.querySelectorAll("input, select, textarea")
        );

        for (const campo of campos) {
            // Ignorar controles ocultos y deshabilitados.
            if (
                campo.disabled ||
                campo.type === "hidden" ||
                campo.type === "submit" ||
                campo.type === "button" ||
                campo.type === "reset"
            ) {
                continue;
            }

            // Todos los campos visibles son obligatorios,
            // salvo los que tengan data-opcional="true".
            if (campo.dataset.opcional === "true") {
                continue;
            }

            const nombre = obtenerNombreCampo(campo, formulario);

            // Comprobar si está vacío.
            if (!campo.value || !campo.value.trim()) {
                alert("⚠️ Falta completar el campo: " + nombre);

                campo.focus();
                return false;
            }

            // Comprobar formato de correo, teléfono y otros tipos.
            if (!campo.checkValidity()) {
                alert(
                    "⚠️ El campo «" + nombre +
                    "» contiene un dato incorrecto. Revísalo antes de continuar."
                );

                campo.focus();
                return false;
            }
        }

        return true;
    }

    function mostrarConfirmacion(formulario) {
        if (!confirmModal || !confirmDataList) {
            alert("No se encontró la ventana de confirmación. Revisa el HTML de base.html.");
            return;
        }

        currentFormToSend = formulario;
        confirmDataList.replaceChildren();

        const campos = Array.from(formulario.elements);

        campos.forEach(campo => {
            if (
                !campo.name ||
                campo.disabled ||
                ["submit", "button", "reset", "hidden", "password", "file"].includes(campo.type)
            ) {
                return;
            }

            if (["checkbox", "radio"].includes(campo.type) && !campo.checked) {
                return;
            }

            const nombre = obtenerNombreCampo(campo, formulario);

            let valor = "";

            if (campo.tagName === "SELECT") {
                valor = campo.options[campo.selectedIndex]?.textContent.trim() || "";
            } else {
                valor = campo.value.trim();
            }

            if (!valor) {
                valor = "Sin información";
            }

            const tarjeta = document.createElement("div");
            tarjeta.className = "confirm-data-item";

            const etiqueta = document.createElement("span");
            etiqueta.className = "confirm-data-label";
            etiqueta.textContent = nombre;

            const contenido = document.createElement("div");
            contenido.className = "confirm-data-value";
            contenido.textContent = valor;

            tarjeta.append(etiqueta, contenido);
            confirmDataList.appendChild(tarjeta);
        });

        confirmModal.classList.add("active");
        confirmModal.setAttribute("aria-hidden", "false");
    }

    function cerrarConfirmacion() {
        if (confirmModal) {
            confirmModal.classList.remove("active");
            confirmModal.setAttribute("aria-hidden", "true");
        }

        currentFormToSend = null;
    }

    /* Interceptar el envío inicial de los formularios */
    document.querySelectorAll(".contacto-form, .solicitud-form").forEach(formulario => {

        formulario.setAttribute("novalidate", "novalidate");

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            if (!validarFormulario(formulario)) {
                return;
            }

            mostrarConfirmacion(formulario);
        });
    });

    /* Volver a editar */
    editDataButton?.addEventListener("click", function () {
        const formulario = currentFormToSend;

        cerrarConfirmacion();

        if (formulario) {
            formulario.querySelector("input:not([type='hidden']), select, textarea")
                ?.focus({ preventScroll: true });
        }
    });

    /* Confirmar y enviar a Flask */
    sendDataButton?.addEventListener("click", function () {
        if (!currentFormToSend) {
            return;
        }

        const formulario = currentFormToSend;

        // Volver a comprobar los datos antes de enviar.
        if (!validarFormulario(formulario)) {
            return;
        }

        // Cerrar la ventana de confirmación.
        cerrarConfirmacion();

        // Enviar directamente a Flask sin volver a activar
        // el evento submit que muestra la confirmación.
        HTMLFormElement.prototype.submit.call(formulario);
    });

    /* =======================================================
       FUNCIONALIDAD: MENÚ DE NAVEGACIÓN COMPACTO AL HACER SCROLL
       ======================================================= */
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        const logo = document.getElementById('header-logo');

        if (header) {
            if (window.scrollY > 50) {
                // Al desplazar hacia abajo: reducimos padding vertical y agregamos sombra
                header.classList.remove('py-4');
                header.classList.add('py-2', 'bg-white', 'shadow-md');
                
                if (logo) {
                    logo.style.width = '35px';
                    logo.style.height = '35px';
                }
            } else {
                // Al volver arriba de todo: regresamos al tamaño original
                header.classList.remove('py-2', 'shadow-md');
                header.classList.add('py-4');
                
                if (logo) {
                    logo.style.width = '45px';
                    logo.style.height = '45px';
                }
            }
        }
    });

    /* Cerrar con Escape */
    document.addEventListener("keydown", function (evento) {
        if (
            evento.key === "Escape" &&
            confirmModal?.classList.contains("active")
        ) {
            cerrarConfirmacion();
        }
    });
});