using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace proba1Adriana.Migrations
{
    /// <inheritdoc />
    public partial class V2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Slika",
                table: "Pozoriste");

            migrationBuilder.AlterColumn<string>(
                name: "Slika",
                table: "Predstava",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "Slika",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<int>(type: "int", nullable: false),
                    PredstavaID = table.Column<int>(type: "int", nullable: true),
                    PozoristeID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Slika", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Slika_Pozoriste_PozoristeID",
                        column: x => x.PozoristeID,
                        principalTable: "Pozoriste",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Slika_Predstava_PredstavaID",
                        column: x => x.PredstavaID,
                        principalTable: "Predstava",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Slika_PozoristeID",
                table: "Slika",
                column: "PozoristeID");

            migrationBuilder.CreateIndex(
                name: "IX_Slika_PredstavaID",
                table: "Slika",
                column: "PredstavaID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Slika");

            migrationBuilder.AlterColumn<string>(
                name: "Slika",
                table: "Predstava",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Slika",
                table: "Pozoriste",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
