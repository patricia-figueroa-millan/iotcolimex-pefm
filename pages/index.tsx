import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient() 

  return (
    <div>
      <div>
        <div style={{ 
          margin: 'auto',
          padding: '10px 0 0 0',
          width: '50%',
          border: '3px solid black'}}>
          <center>
            <label style={{color:'GrayText'}}>
              INICIO DE SESIÓN
            </label>
          </center>
          {!session ? (
            <Auth 
            supabaseClient={supabase} 
            appearance={{ theme: ThemeSupa }}
            providers = {[]} 
            theme="dark" />
          ) 
          : 
          (
            <Account session={session} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Home