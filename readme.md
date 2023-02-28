to do's:

bekijken hoe ik de html elements maak voor de tasks
index adden als dataattribute aan de task


Coden via het model view controller

--------- model --------
database van tasks (iffy) getters en setters
database van projects (iffy) getters en setters


class van task nodig met de volgende attributes:
-date
-prioriteit (string)(high/low)
-task omschrijving (string)

class van projects:
-naam (string)



--------- controller ------------
logic en manipulator

create manager-
neemt de inputs van de user en zet die om in model


relationship manager
-weet elke task er aan welk project is toegewezen en kan dit veranderen

-priority manager

verandert de prioriteit van de tasks

-delete manager