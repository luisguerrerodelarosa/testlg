
var app = angular.module('dashboard.providers.navigation', []);
app.provider( "navigation", function ProvideNavigation() {
        this.current= undefined;
        var navRoutes = {
          /* PÁGINA */
            home:{ 
              url: '/', /* ruta en url */
              templateUrl: 'views/pages/home.html', /* template html */
              menuItem: 'Resumen', /* si se agrega en menú lateral y con que nombre */
              services: { //cargo servicios que no solo se usan en gráficas si no en general de la página
                homeData:{ /* nombre/key webservice */
                  url: 'concept', /* url webservice */
                  requiredParams: ['comparingDate'], /* parámetros que necesita recibir webservice */
                 /* transformJSON: ['infraestructura', 'venta'] */
                }
              },
              /* GRÁFICAS DE LA PÁGINA*/
              /* setea el tipo de gráfica y que webservie necesita (si no se ha cargado previamente lo carga) */
              charts:{
                totalTransaccionesAnio:{ /* nombre/key de la grafica */
                  type: 'doughnut', /* tipo de la grafica */
                  requiredService:{ /* Webservice a cargar con la grafica (si se ha cargado previamente, no lo vuelve a consumir) */
                    totalTransaccionesAnio:{ /* nombre/key webservice */
                        url:'channel/1', /* url webservice */
                        requiredParams: ['year'] /* parámetros que necesita recibir webservice */
                    }
                  }
                },
                transaccionesAlMes:{
                  type: 'bar',
                  requiredService:{
                    homeData:{
                      url: 'concept',
                      requiredParams: ['comparingDate']
                    }
                  },
                  serviceChild: 'transacciones_al_mes' /* si el objeto de la gráfica es hijo del objeto que devuelve el servicio*/
                },
                clientesAtendidos:{
                  type: 'bar',
                  requiredService:{
                    homeData:{
                      url: 'concept',
                      requiredParams: ['comparingDate']
                    }
                  },
                  serviceChild: 'clientes_atendidos'
                }
              }
            },
            atm:{
               url: '/atm',
               templateUrl: 'views/pages/atm.html',
               menuItem: "ATM's"
            },
            web:{
               url: '/web',
               templateUrl: 'views/pages/web.html',
               menuItem: 'WEB'
            },
            movil:{
               url: '/movil',
               templateUrl: 'views/pages/movil.html',
               menuItem: 'Móvil'
            },
            corresponsalias:{
               url: '/corresponsalias',
               templateUrl: 'views/pages/corresponsalias.html',
               menuItem: 'Corresponsalías'
            },
            sucursales:{
               url: '/sucursales',
               templateUrl: 'views/pages/sucursales.html',
               menuItem: 'Sucursales'
            },
            centrocontacto:{
               url: '/centrocontacto',
               templateUrl: 'views/pages/centrocontacto.html',
               menuItem: 'Centro de Contacto'
            },
            fullreport:{ 
              url: '/fullreport',
              templateUrl: 'views/pages/fullreport.html',
              menuItem: 'Tablero Canales',
              services: { //cargo servicios que no solo se usan en gráficas si no en general de la página
                homeData:{ /* nombre/key webservice */
                  url: 'concept', /* url webservice */
                  requiredParams: ['comparingDate'], /* parámetros que necesita recibir webservice */
                 /* transformJSON: ['infraestructura', 'venta'] */
                }
              },
              tables:{
                transacciones_al_mes:{
                  requiredService:{
                    homeData:{
                      url: 'concept',
                      requiredParams: ['comparingDate']
                    }
                  },
                  serviceChild: 'transacciones_al_mes'
                },
                infraestructura:{
                  requiredService:{
                    homeData:{
                      url: 'concept',
                      requiredParams: ['comparingDate']
                    }
                  },
                  serviceChild: 'infraestructura'
                },
                niveles_de_servicio:{
                  requiredService:{
                    homeData:{
                      url: 'concept',
                      requiredParams: ['comparingDate']
                    }
                  },
                  serviceChild: 'niveles_de_servicio'
                },
                costos_por_transaccion:{
                  requiredService:{
                    homeData:{
                      url: 'concept',
                      requiredParams: ['comparingDate']
                    }
                  },
                  serviceChild: 'costos_por_transaccion'
                },
                ingresos_no_financieros:{
                  requiredService:{
                    homeData:{
                      url: 'concept',
                      requiredParams: ['comparingDate']
                    }
                  },
                  serviceChild: 'ingresos_no_financieros'
                },
                clientes_atendidos:{
                  requiredService:{
                    homeData:{
                      url: 'concept',
                      requiredParams: ['comparingDate']
                    }
                  },
                  serviceChild: 'clientes_atendidos'
                },
                venta:{
                  requiredService:{
                    homeData:{
                      url: 'concept',
                      requiredParams: ['comparingDate']
                    }
                  },
                  serviceChild: 'venta'
                },
                factoratm:{
                  titlePreffix:'Factores ',
                  requiredService:{
                    factores:{
                      url: 'information/factor',
                      requiredParams: ['comparingDate']
                    }
                  },
                  serviceChild: 'atm'
                },
                factorweb:{
                  titlePreffix:'Factores ',
                  requiredService:{
                    factores:{
                      url: 'information/factor',
                      requiredParams: ['comparingDate']
                    }
                  },
                  serviceChild: 'web'
                },
                factormovil:{
                  titlePreffix:'Factores ',
                  requiredService:{
                    factores:{
                      url: 'information/factor',
                      requiredParams: ['comparingDate']
                    }
                  },
                  serviceChild: 'movil'
                },
                factorsucursales:{
                  titlePreffix:'Factores ',
                  requiredService:{
                    factores:{
                      url: 'information/factor',
                      requiredParams: ['comparingDate']
                    },
                  },
                  serviceChild: 'sucursales'
                },
              }
            }
        };
        angular.forEach(navRoutes, function(value, key) {
            navRoutes[key].name=key;
        });
        return({
            getNavigation: getNavigation,
            setCurrent: setCurrent,
            $get: instantiateNavigation
        });

        function getNavigation() {
                return navRoutes;
            } 
        function setCurrent(name){
            name= (name==undefined || name=="")? "home": name;
            this.current = navRoutes[name];
        } 
        function instantiateNavigation() {
            return({
                getNavigation: getNavigation,
                setCurrent : setCurrent
            });                    
        }
    }
);