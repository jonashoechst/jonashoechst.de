---
title: "Corona-Apps: Halbseidene Offenheit"
layout: post
date: 2020-06-15 18:00
image: /assets/images/corona-apps.jpg
headerImage: false
tag:
- Open Source
- Contact Tracing
category: blog
author: jonashoechst
description: Digitale Kontaktnachverfolgung braucht Open Source
---
**Corona-Apps zur Kontaktnachverfolgung werden von vielen als ein wichtiger Baustein zur Bewältigung der Corona-Krise betrachtet: eine technische Lösung für ein doch sehr menschliches Problem. Ihre Wirksamkeit hängt von ihrer Nutzung durch eine kritische Masse der Bevölkerung ab. Um das für ihre Nutzung notwendige Vertrauen zu schaffen, sind Informatiker\*innen gefragt, Corona-Apps auf Herz und Nieren prüfen. Doch wie überprüfbar sind die unter dem Schlagwort "Open Source" veröffentlichten Apps wirklich?**

![/assets/images/corona-apps.jpg](/assets/images/corona-apps.jpg)

Die übliche Strategie zur Bekämpfung einer beginnenden Epidemie ist die Verfolgung von Kontakten verbunden mit der Eindämmung der Ansteckungen. Im Zuge der COVID-19 Pandemie soll nun zu einem fortgeschritteneren Zeitpunkt der Ausbreitung mithilfe einer Corona-App eine Kontaktnachverfolgung in der Breite der Bevölkerung umgesetzt werden. Die zentrale Idee ist, physische Kontakte von Personen mittels Smartphones zu protokollieren, sodass im Fall einer Infektion die aufgezeichneten Kontakte über eine potentielle Ansteckung informiert werden können.

In einigen Ländern kristallisiert sich die Funktechnologie Bluetooth Low Energy (BLE) in Kombination mit einem dezentralen Datenabgleich als Mittel der Wahl heraus, um den Datenschutz in Corona-Apps zu gewährleisten. Auf dem Smartphone-Markt dominieren die Betriebssysteme Android von Google und iOS von Apple. Damit sollte eine Corona-App insbesondere unter Android und iOS lauffähig sein. Schon bei den ersten internationalen Umsetzungen (PEPP-PT, DP-3T, BlueTrace) kamen Einschränkungen beiden Betriebssystemen zum Vorschein, die eine schnelle Entwicklung von Corona-Apps verhinderten und deren Praxistauglichkeit in Frage stellten, etwa durch die regelmäßige Aufforderung an den\*die Nutzer\*in, die App erneut zu öffnen. Um solche Einschränkungen zu beheben, haben Google und Apple gemeinsam eine Spezifikation für eine Programmierschnittstelle mit dem Namen [Exposure Notification API][google-gen-apidoc] im Rahmen ihres Konzepts für ein ["Privacy-Preserving Contact Tracing"][contacttracing] zur Kontaktnachverfolgung auf Betriebssystemebene erstellt. 

Ob eine Corona-App durch eine [kritische Masse der Bevölkerung][bbc-nhs-80percent] genutzt wird, hängt von [vielen Faktoren][netzpolitik-akzeptanz] ab. So forderten Expert\*innen des Chaos Computer Clubs bereits [im April 2020 in ihren 10 Prüfsteinen][ccc-10-pruefsteine] die vollständige Transparenz und Überprüfbarkeit einer Corona-App.

## Apple und Google vernebeln die Sicht

Um eine mobile App für das Apple-Betriebssystem iOS zu entwickeln, ist es notwendig, eine digitale Signatur erstellen zu können, die vom Betriebssystem akzeptiert wird. Ein solches *Code Signing* erlaubt, dass vor der Ausführung einer App sichergestellt wird, dass alle mit der App ausgelieferten Bibliotheken, Ressourcen, sowie der Programmcode selbst, unverändert sind. Um eine von iOS akzeptierte Signatur zu erstellen, wird ein von Apple ausgestelltes Zertifikat benötigt. Dieses kann grundsätzlich entweder für die Entwicklung, also für eigene Geräte, oder für die Veröffentlichung gelten. Zudem gibt es bestimmte Berechtigungen ("Entitlements"), die pro App festgelegt werden. Benötigt eine App einen bestimmten Dienst oder eine Komponente des Betriebssystems, muss dies durch eine Berechtigung angeben werden. Bei der Signatur der App werden die angegebenen Berechtigungen mit den Informationen des Entwicklerzugangskontos und weiteren Projektinformationen abgeglichen und [für die App freigegeben][apple-entitlements]. Die Berechtigung zur Nutzung der *Exposure Notification API* erhält eine App aber nur, [wenn sie von einer staatlichen Gesundheitsbehörde dazu autorisiert ist][apple-entitlement-exposure-notification-apis-addendum]; dabei soll es laut Google und Apple nur eine einzige autorisierte Corona-App pro Land geben. Diese Einschränkungen gelten insbesondere auch für die Entwicklung einer App auf dem eigenen Gerät, also ohne Absicht einer Verteilung durch den App Store oder über andere Wege. Auch die Implementierung, also der von Apple geschriebene Code der API, ist nicht frei verfügbar, was eine Überprüfbarkeit insgesamt unmöglich macht.

Bei Google ist die *Exposure Notification API* kein Teil des freien Android-Betriebssystems, sondern eine Komponente der proprietären [_Google Play Services_][wiki-gms]. Es handelt sich dabei um eine Programmierbibliothek von Google, die verschiedene Dienste anbietet, z.B. für Werbung, Google Maps oder Fitness. Ein Vorteil dieses Konzepts ist, dass Google diese _Play Services_ unabhängig von dem jeweiligen Smartphone-Hersteller aktualisieren kann und kein vollständiges Betriebssystem-Update notwendig ist. Eine spezielle Version der _Google Play Services_, in der sich die [Exposure Notification API][google-gen-apidoc] findet, steht aktuell ebenfalls [lediglich für Gesundheitsbehörden der einzelnen Länder zur Verfügung][google-gen-terms]. Die [Beispiel-App][exposure-notification-android], die in erster Linie als Blaupause für verschiedene Länder-Apps konzipiert ist, lässt sich zwar bei Entwickler\*innen für ein beliebiges Android-Gerät kompilieren, aber spätestens beim Aktivieren der _Exposure Notifications_ stürzt die App wegen der nicht vorhandenen Nutzungsmöglichkeit der API ab. Auch die API-Implementierung von Google ist nicht als Quellcode vorhanden und kann auf einer technischen Ebene nicht nachvollzogen werden.


## DP-3T offen, SwissCovid nicht
Mit der [DP-3T-Android-Bibliothek][dp3t-sdk-android] war es auf einfache Art und Weise möglich, eine funktionierende App zu kompilieren, auszuführen und die vollständige Implementierung zu testen - allerdings nur bis zu dem Zeitpunkt, an dem auch DP-3T zur proprietären *Exposure Notification API* von Google wechselte. DP-3T bildet die Grundlage für die in der Schweiz entwickelte *SwissCovid* App, die derzeit in einer ersten Pilotphase vom dortigen Bundesamt für Gesundheit (BAG) und einem [ausgewählten Personenkreis getestet][swisscovid-press] wird. In der Zwischenzeit wurde *SwissCovid* über den App Store von Apple zum Download angeboten, wird jedoch [durch einen Disclaimer][watson-ch-swisscovid] vor der Nutzung außerhalb eines bestimmten Personenkreises "geschützt". Die App ist zwar als "Open Source" auf [GitHub][dp3t-app-ios-ch] verfügbar, jedoch ebenfalls aus oben genannten Gründen hinsichtlich der *Exposure Notification API* für Dritte nicht reproduzier- und veränderbar. 

## Digitale Kontaktnachverfolgung braucht Open Source

Die von Apple und Google festgelegten Restriktionen bei der Nutzung ihrer *Exposure Notification API* erschweren die Nachvollziehbarkeit von Corona-Apps. Somit hat das Schlagwort *Open Source* im Kontext von Corona-Apps nicht die intendierte Bedeutung. Auch die in Kürze erwartete deutsche *Corona-Warn-App* soll nach aktuellem Stand der Dinge unter einer *Open Source* Lizenz erscheinen, wird aber für Dritte aus genannten Gründen ebenfalls nur eingeschränkt nachvollziehbar sein. Um aber ein hohes Vertrauen in die Technologie zur Kontaktnachverfolgung zu schaffen, muss die Reproduzierbarkeit von Corona-Apps hinsichtlich des umfänglichen Kompilierens, Testens und Veränderns des gesamten Codes (App, *Exposure Notification API*, Backend-Server) ermöglicht werden. 


*Dieser Beitrag wurde von Alvar Penning, Jonas Höchst und Prof. Dr. Bernd Freisleben verfasst und initial [bei der Gesellschaft für Informatik][article-gi] veröffentlicht.*

*Bild: [Mika Baumeister (@mbaumi) via Unsplash](https://unsplash.com/photos/PfMXXv8XXgs)*

[article-gi]:https://gi.de/themen/beitrag/corona-apps-halbseidene-offenheit
[dp3t-sdk-android]:https://github.com/DP-3T/dp3t-sdk-android
[swisscovid-press]:https://www.melani.admin.ch/melani/de/home/public-security-test/infos.html
[watson-ch-swisscovid]:https://www.watson.ch/digital/schweiz/230112345-swisscovid-app-bund-betont-dass-testversion-nicht-fuer-alle-sei
[dp3t-app-ios-ch]:https://github.com/DP-3T/dp3t-app-ios-ch
[wiki-gms]:https://en.wikipedia.org/wiki/Google_Play_Services
[google-gen-terms]:https://blog.google/documents/72/Exposure_Notifications_Service_Additional_Terms.pdf
[google-gen-apidoc]:https://static.googleusercontent.com/media/www.google.com/en//covid19/exposurenotifications/pdfs/Android-Exposure-Notification-API-documentation-v1.3.2.pdf
[exposure-notification-android]:https://github.com/google/exposure-notifications-android
[apple-entitlements]:https://developer.apple.com/documentation/bundleresources/entitlements
[apple-entitlement-exposure-notification-apis-addendum]: https://developer.apple.com/contact/request/download/Exposure_Notification_Addendum.pdf
[contacttracing]:https://www.apple.com/covid19/contacttracing
[bbc-nhs-80percent]:https://www.bbc.co.uk/news/technology-52294896
[ccc-10-pruefsteine]:https://www.ccc.de/de/updates/2020/contact-tracing-requirements
[netzpolitik-akzeptanz]:https://netzpolitik.org/2020/corona-app-befragung-nutzer-wollen-kontrolle-und-freiwilligkeit/
