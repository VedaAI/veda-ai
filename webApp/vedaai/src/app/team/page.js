import styleTeam from '../css/team.module.css'



export default function Team(){
    return(
        <div className={styleTeam.team}>
            <h1 className={styleTeam.teamH1}>Meet Our Team</h1>
            <br></br>
            <h2 className={styleTeam.teamH2}>Passionate. Proactive. Expert</h2>

<br></br>
            <p className={styleTeam.teamP}> We lead with <u>CARE</u> and share a passion for connecting world using AI</p>
            <br></br>
            <br></br>

            <div className={styleTeam.teamCards}>
                <div className={styleTeam.teamMember}>
                    <div className={styleTeam.teamMemberPhoto}>
                        <img className={styleTeam.teamMemberPhoto} src='assets/images/person.png' alt='person img'></img>
                    </div>
                    <div className={styleTeam.teamMemberDetails}>
                        <h3 className={styleTeam.teamMemberDetailsH3} >Agrim Kulshreshtha</h3>
                        <p className={styleTeam.teamMemberDetailsP} >Full Stack Developer</p>

                    </div>
                </div>

                <div className={styleTeam.teamMember}>
                    <div className={styleTeam.teamMemberPhoto}>
                        <img className={styleTeam.teamMemberPhoto} src='assets/images/person.png' alt='person img'></img>
                    </div>
                    <div className={styleTeam.teamMemberDetails}>
                        <h3 className={styleTeam.teamMemberDetailsH3} >Aditya Choudhary</h3>
                        <p className={styleTeam.teamMemberDetailsP} >AI Developer</p>

                    </div>
                </div>


                <div className={styleTeam.teamMember}>
                    <div className={styleTeam.teamMemberPhoto}>
                        <img className={styleTeam.teamMemberPhoto} src='assets/images/person.png' alt='person img'></img>
                    </div>
                    <div className={styleTeam.teamMemberDetails}>
                        <h3 className={styleTeam.teamMemberDetailsH3}>Tejas Taneja</h3>
                        <p className={styleTeam.teamMemberDetailsP}>AI Developer</p>

                    </div>
                </div>


                <div className={styleTeam.teamMember}>
                    <div className={styleTeam.teamMemberPhoto}>
                        <img className={styleTeam.teamMemberPhoto} src='assets/images/person.png' alt='person img'></img>
                    </div>
                    <div className={styleTeam.teamMemberDetails}>
                        <h3 className={styleTeam.teamMemberDetailsH3}>Haritk Anand</h3>
                        <p className={styleTeam.teamMemberDetailsP}>Developer</p>

                    </div>
                </div>

            </div>


        
        </div>
    )
} 