using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace proba1Adriana.Migrations
{
    /// <inheritdoc />
    public partial class V1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Aplikacija",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aplikacija", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Korisnik",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Lozinka = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AplikacijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnik", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Korisnik_Aplikacija_AplikacijaID",
                        column: x => x.AplikacijaID,
                        principalTable: "Aplikacija",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Pozoriste",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AplikacijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pozoriste", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Pozoriste_Aplikacija_AplikacijaID",
                        column: x => x.AplikacijaID,
                        principalTable: "Aplikacija",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Predstava",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Datum = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Vreme = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Zanr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Reditelj = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AplikacijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Predstava", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Predstava_Aplikacija_AplikacijaID",
                        column: x => x.AplikacijaID,
                        principalTable: "Aplikacija",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Umetnik",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AplikacijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Umetnik", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Umetnik_Aplikacija_AplikacijaID",
                        column: x => x.AplikacijaID,
                        principalTable: "Aplikacija",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Rezervacija",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cena = table.Column<int>(type: "int", nullable: false),
                    PredstavaID = table.Column<int>(type: "int", nullable: true),
                    KorisnikID = table.Column<int>(type: "int", nullable: true),
                    AplikacijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rezervacija", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Rezervacija_Aplikacija_AplikacijaID",
                        column: x => x.AplikacijaID,
                        principalTable: "Aplikacija",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Rezervacija_Korisnik_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnik",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Rezervacija_Predstava_PredstavaID",
                        column: x => x.PredstavaID,
                        principalTable: "Predstava",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Sediste",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Red = table.Column<int>(type: "int", nullable: false),
                    Broj = table.Column<int>(type: "int", nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Zauzeto = table.Column<bool>(type: "bit", nullable: false),
                    PredstavaID = table.Column<int>(type: "int", nullable: true),
                    RezervacijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sediste", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Sediste_Predstava_PredstavaID",
                        column: x => x.PredstavaID,
                        principalTable: "Predstava",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Sediste_Rezervacija_RezervacijaID",
                        column: x => x.RezervacijaID,
                        principalTable: "Rezervacija",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Korisnik_AplikacijaID",
                table: "Korisnik",
                column: "AplikacijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Pozoriste_AplikacijaID",
                table: "Pozoriste",
                column: "AplikacijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Predstava_AplikacijaID",
                table: "Predstava",
                column: "AplikacijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Rezervacija_AplikacijaID",
                table: "Rezervacija",
                column: "AplikacijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Rezervacija_KorisnikID",
                table: "Rezervacija",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_Rezervacija_PredstavaID",
                table: "Rezervacija",
                column: "PredstavaID");

            migrationBuilder.CreateIndex(
                name: "IX_Sediste_PredstavaID",
                table: "Sediste",
                column: "PredstavaID");

            migrationBuilder.CreateIndex(
                name: "IX_Sediste_RezervacijaID",
                table: "Sediste",
                column: "RezervacijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Umetnik_AplikacijaID",
                table: "Umetnik",
                column: "AplikacijaID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pozoriste");

            migrationBuilder.DropTable(
                name: "Sediste");

            migrationBuilder.DropTable(
                name: "Umetnik");

            migrationBuilder.DropTable(
                name: "Rezervacija");

            migrationBuilder.DropTable(
                name: "Korisnik");

            migrationBuilder.DropTable(
                name: "Predstava");

            migrationBuilder.DropTable(
                name: "Aplikacija");
        }
    }
}
