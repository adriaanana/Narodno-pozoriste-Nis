using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace proba1Adriana.Migrations
{
    /// <inheritdoc />
    public partial class V6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Slika_Pozoriste_PozoristeID",
                table: "Slika");

            migrationBuilder.DropIndex(
                name: "IX_Slika_PozoristeID",
                table: "Slika");

            migrationBuilder.DropColumn(
                name: "PozoristeID",
                table: "Slika");

            migrationBuilder.AddColumn<string>(
                name: "Slika",
                table: "Pozoriste",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Slika",
                table: "Pozoriste");

            migrationBuilder.AddColumn<int>(
                name: "PozoristeID",
                table: "Slika",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Slika_PozoristeID",
                table: "Slika",
                column: "PozoristeID");

            migrationBuilder.AddForeignKey(
                name: "FK_Slika_Pozoriste_PozoristeID",
                table: "Slika",
                column: "PozoristeID",
                principalTable: "Pozoriste",
                principalColumn: "ID");
        }
    }
}
