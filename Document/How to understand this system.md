# GOAL
## Main goal
The main goal of our system is automatically scheduled your all activity.
### Use Diagramm
```puml
@startuml
left to right direction

skinparam packageStyle rectangle
actor User
actor System

rectangle activity {

  User--(create)
  User--(edit)
  User--(delete)
  User--(read)
  (read)--System

}

rectangle schedule {
  User--(read schedule)
  (make schedule)--System
}

@enduml

```


# Definition
## Activity
#### Event and activity
In the course of SoftwareTechnik by Dr.Prof. Bruege, we learned that
> a event is combination of activity.

```puml
@startuml
event o-- activity
@enduml

```

***But i like another description on dictionary***
> a event is a thing that happens or takes place, especially one of importance.

```puml
@startuml
activity <|-- event
activity o-- activity
@enduml

```
### What is a activity in our system
In our system a activity can be any thing,what you are going to do.
e.g.:
  + course
  + work
  + meeting

it can also be:
  + sleep
  + eat

### Fixed or Flexiable
In traditional time or project management applications the activity can only be fixed.But  in reality the time of activity can also be subjectively determined. E.g. do homework or read some thing.

UML is like so:
* Traditional
```puml
@startuml
class FixedActivity
class FixedActivity {
  - Time start
  - Time end
}
@enduml

```
* Our

```puml
@startuml
class Activity
class FlexibleActivity
Activity o-- Activity
Activity <|-- FlexibleActivity

class Activity {
  - Time start
  - Time end
} 

class FlexibleActivity{
  - TimeDistance workTime
}
@enduml
```
### Importance
