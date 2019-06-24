@Regression @GenericCRUD
Feature: Delete an Item
    As a user
    I should be able to delete an item.

    @GenericDelete
    Scenario Outline: Delete an item
        Given I have an existing <itemType>
            And I am on <itemUrl>
        When I "delete" a/an <itemType> item
        Then I should "not see" the details of the <itemTypePlural> in the table

    @CompanyCRUD @CompanyDelete
    Scenarios:
        | itemUrl                 | itemType   | itemTypePlural |
        | "/#/hmws/companies"     | "Company"  | "Companies"    |

    @SkillCRUD @SkillDelete
    Scenarios:
        | itemUrl                 | itemType   | itemTypePlural |
        | "/#/hmws/skills"        | "Skill"    | "Skills"       |

    @MachineCRUD @MachineDelete
    Scenarios:
        | itemUrl                 | itemType   | itemTypePlural |
        | "/#/hmws/machines"      | "Machine"  | "Machines"     |