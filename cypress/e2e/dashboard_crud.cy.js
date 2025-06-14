describe("Dashboard CRUD", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:8001/login");

        cy.get('input[name="email"]').type("jason@gmail.com");
        cy.get('input[name="password"]').type("12345678");
        cy.get('button[type="submit"]').click();

        cy.wait(4000); 
        cy.url().should("include", "/dashboard");
    });

    it("Read: Menampilkan daftar komentar", () => {
        cy.contains("Comments List").should("exist");
        cy.get(".grid > div").should("have.length.greaterThan", 0);
    });

    it("Create: Menambahkan komentar baru", () => {
        cy.contains("Add New Comment").click();

        cy.get("input").eq(0).type("Nama Test");
        cy.get("input").eq(1).type("test@example.com");
        cy.get("textarea").type("Ini komentar uji coba");
        cy.contains("Save").click();

        cy.contains("Nama Test").should("exist");
        cy.contains("Ini komentar uji coba").should("exist");
    });

    it("Update: Mengedit komentar pertama", () => {
        cy.get(".grid > div")
            .first()
            .within(() => {
                cy.contains("Edit").click();
            });

        cy.get("textarea").clear().type("Komentar telah diperbarui");
        cy.contains("Update").click();

        cy.contains("Komentar telah diperbarui").should("exist");
    });

    it("Delete: Menghapus komentar", () => {
        cy.get(".grid > div")
            .first()
            .within(() => {
                cy.contains("Delete").click();
            });

        cy.on("window:confirm", () => true);

        cy.contains("Nama Test").should("not.exist");
    });
});
