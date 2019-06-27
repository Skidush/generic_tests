@GenericRead
Feature: Read an Item
    As a user
    I should be able to view and read the details of an item.
    
    @GenericReadFromTable
    Scenario Outline: Read <itemType> details from the table
        Given I have an existing <itemType>
            And I am on <itemUrl>
        When The <itemType> table has loaded
        Then I should "see" the details of the <itemTypePlural> in the table

    @CompanyCRUD @ReadCompanyFromTable
    Scenarios:
        | itemType  | itemUrl              | itemTypePlural |
        | "Company" | "/#/hmws/companies"  | "Companies"    |

    @SkillCRUD @ReadSkillFromTable
    Scenarios:
        | itemType  | itemUrl              | itemTypePlural |
        | "Skill"   | "/#/hmws/skills"     | "Skills"       |

    @MachineCRUD @ReadMachineFromTable
    Scenarios:
        | itemType  | itemUrl              | itemTypePlural |
        | "Machine" | "/#/hmws/machines"   | "Machines"     |
    
    @GenericReadFromDetails
    Scenario Outline: Read <itemType> from the details page
        Given I have an existing <itemType>
        When I navigate to a/an <itemType> details page
        Then I should see the "selected" details of the <itemType>

    @CompanyCRUD @ReadCompanyFromDetails
    Scenarios:
        | itemType  | itemUrl              |
        | "Company" | "/#/hmws/companies"  |

    @SkillCRUD @ReadSkillFromDetails
    Scenarios:
        | itemType  | itemUrl              |
        | "Skill"   | "/#/hmws/skills"     |

    @MachineCRUD @ReadMachineFromDetails
    Scenarios:
        | itemType  | itemUrl              |
        | "Machine" | "/#/hmws/machines"   |