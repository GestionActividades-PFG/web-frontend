'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">front-fct documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-dddd335fd0c42d60b23d00a73b19d1c8f034c3219c0dd5aae310a8972e126eaef5f7e4219aa832330770e9b450f586a0ac4230539fc31c1d1e362a2503d8c8ab"' : 'data-target="#xs-components-links-module-AppModule-dddd335fd0c42d60b23d00a73b19d1c8f034c3219c0dd5aae310a8972e126eaef5f7e4219aa832330770e9b450f586a0ac4230539fc31c1d1e362a2503d8c8ab"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-dddd335fd0c42d60b23d00a73b19d1c8f034c3219c0dd5aae310a8972e126eaef5f7e4219aa832330770e9b450f586a0ac4230539fc31c1d1e362a2503d8c8ab"' :
                                            'id="xs-components-links-module-AppModule-dddd335fd0c42d60b23d00a73b19d1c8f034c3219c0dd5aae310a8972e126eaef5f7e4219aa832330770e9b450f586a0ac4230539fc31c1d1e362a2503d8c8ab"' }>
                                            <li class="link">
                                                <a href="components/ActividadComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActividadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActividadesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActividadesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdministrarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdministrarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogoConfirmacionBorradoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogoConfirmacionBorradoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogoFormularioActividadAltaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogoFormularioActividadAltaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogoFormularioActividadEditarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogoFormularioActividadEditarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogoFormularioInscripcionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogoFormularioInscripcionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogoFormularioMomentoAltaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogoFormularioMomentoAltaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogoFormularioMomentoEditarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogoFormularioMomentoEditarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarMovilComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarMovilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrivacyPolicyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrivacyPolicyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToastComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToastComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/PageNotFoundComponent.html" data-type="entity-link" >PageNotFoundComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpService.html" data-type="entity-link" >HttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ObtenerFormularioService.html" data-type="entity-link" >ObtenerFormularioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ObtenerIdService.html" data-type="entity-link" >ObtenerIdService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link" >TokenInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/coordinadorEtapa.html" data-type="entity-link" >coordinadorEtapa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtDataModule.html" data-type="entity-link" >JwtDataModule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/roles.html" data-type="entity-link" >roles</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tokens.html" data-type="entity-link" >Tokens</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/tutorCurso.html" data-type="entity-link" >tutorCurso</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});