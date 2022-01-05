import { aptInstall, input } from "../api";
import { Script } from "../script";
import * as inq from "inquirer";

module.exports = class i3 implements Script {
    scriptName: string;
    dependencies: string[];
    distros: string[];

    async install(): Promise<void> {
        inq.prompt([
            {
                type: "checkbox",
                message: "Select additional packages which you'd like to install with i3:",
                name: "pckgs",
                choices: ["i3-gaps", "i3lock-fancy", "py3status", "i3status-rust"],
            },
            {
                type: "list",
                message: "Choose default modifier",
                name: "mod",
                choices: ["Win", "Alt"],
            },
        ]).then((choices) => {
            // TODO: setup i3
            try {
                aptInstall("i3");
                console.log("When entering i3, do not generate config");
            } catch (e) {
                console.error(`Couldn't install:\n${e}`);
            }
            if (choices["i3-gaps"]) {
                // TODO: setup i3-gaps
                // add:
            }
            if (choices["i3lock-fancy"]) {
                // TODO: setup
            }
            if (choices["pi3status"]) {
                // TODO: setup
            }
            if (choices["i3status-rust"]) {
                // TODO: setup
            }
            generateConfig(choices.mod, true, true);
        });

        // if ((await input("Do you want i3lock-fancy? (y/N)")).toLocaleLowerCase() == "y") installList.push("i3lock-fancy");
        //aptInstall(installList.join(" "));
    }
    customize(): void {}
    remove(): void {}
};

function generateConfig(mod: string, verbose: boolean, fancy: boolean) {
    let conf: string =
        "# i3 config file (v4)\n" +
        "# Generated with ez - custom - linux" +
        "# https://i3wm.org/docs/userguide.html for reference!" +
        "# see i3-config-wizard";

    if (verbose) conf += "# Mod (Main) button\n";
    if (mod == "Win") conf += "set $mod = Mod4\n";
    else if (mod == "Alt") conf += "set $mod = Mod1\n";

    if (verbose) conf += "# Font\n";
    conf += "font pango:DroidSansMono, Termius Bold 8.5\n\n";

    if (verbose) conf += "# i3lock the screen before suspend\n";
    if (!fancy)
        conf += "exec --no-startup-id xss-lock --transfer-sleep-lock -- i3lock --nofork\n\n";
    else conf += "exec --no-startup-id xss-lock --transfer-sleep-lock -- i3lock-fancy --nofork\n\n";

    if (verbose) conf += "# NetworkManager applet for the system tray\n";
    conf += "exec --no-startup-id nm-applet\n\n";

    if (verbose) conf += "# Use pactl to adjust volume in PulseAudio\n";
    conf +=
        "set $refresh_i3status killall -SIGUSR1 i3status\
bindsym XF86AudioRaiseVolume exec --no-startup-id pactl set-sink-volume @DEFAULT_SINK@ +10% && $refresh_i3status\
bindsym XF86AudioLowerVolume exec --no-startup-id pactl set-sink-volume @DEFAULT_SINK@ -10% && $refresh_i3status\
bindsym XF86AudioMute exec --no-startup-id pactl set-sink-mute @DEFAULT_SINK@ toggle && $refresh_i3status\
bindsym XF86AudioMicMute exec --no-startup-id pactl set-source-mute @DEFAULT_SOURCE@ toggle && $refresh_i3status\
bindsym $mod+Ctrl+b exec --no-startup-id light -A 10\
bindsym $mod+Ctrl+d exec --no-startup-id light -U 10\n\n";

    if (verbose) conf += "# Use Mouse+$mod to drag floating windows to their wanted position\n";
    conf += "floating_modifier $mod\n\n";

    if (verbose) conf += "# start a terminal\n";
    conf += "bindsym $mod+Return exec i3-sensible-terminal\n\n";

    if (verbose) conf += "# kill focused window\n";
    conf += "bindsym $mod+Shift+q kill\n\n";

    if (verbose) conf += "# start dmenu (a program launcher)\n";
    conf += "bindsym $mod+Shift+d exec dmenu_run\n\n";

    if (verbose) conf += "# Change focus with the cursor keys:\n";
    conf += "bindsym $mod+Left focus left\
bindsym $mod+Down focus down\
bindsym $mod+Up focus up\
bindsym $mod+Right focus right\n\n";

    if (verbose) conf += "# Move focused window with the cursor keys:\n";
    conf += "bindsym $mod+Shift+Left move left\
bindsym $mod+Shift+Down move down\
bindsym $mod+Shift+Up move up\
bindsym $mod+Shift+Right move right\n\n";


    /**



# split in horizontal orientation
bindsym $mod+h split h

# split in vertical orientation
bindsym $mod+v split v

# enter fullscreen mode for the focused container
bindsym $mod+f fullscreen toggle

# change container layout (stacked, tabbed, toggle split)
bindsym $mod+s layout stacking
bindsym $mod+w layout tabbed
bindsym $mod+e layout toggle split

# toggle tiling / floating
bindsym $mod+Shift+space floating toggle

# change focus between tiling / floating windows
bindsym $mod+space focus mode_toggle

# Define names for default workspaces for which we configure key bindings later on.
# We use variables to avoid repeating the names in multiple places.
set $ws1 "1"
set $ws2 "2"
set $ws3 "3"
set $ws4 "4"
set $ws5 "5"
set $ws6 "6"

# switch to workspace
bindsym $mod+1 workspace number $ws1
bindsym $mod+2 workspace number $ws2
bindsym $mod+3 workspace number $ws3
bindsym $mod+4 workspace number $ws4
bindsym $mod+5 workspace number $ws5
bindsym $mod+6 workspace number $ws6

# move focused container to workspace
bindsym $mod+Shift+1 move container to workspace number $ws1
bindsym $mod+Shift+2 move container to workspace number $ws2
bindsym $mod+Shift+3 move container to workspace number $ws3
bindsym $mod+Shift+4 move container to workspace number $ws4
bindsym $mod+Shift+5 move container to workspace number $ws5
bindsym $mod+Shift+6 move container to workspace number $ws6

# reload the configuration file
bindsym $mod+Shift+c reload
#bindsym $mod+Shift+c exec $HOME/Nier-Automata-Rice/config.sh

# restart i3 inplace (preserves your layout/session, can be used to upgrade i3)
bindsym $mod+Shift+r restart

# exit i3 (logs you out of your X session)
bindsym $mod+Shift+e exec "i3-nagbar -t warning -m 'You pressed the exit shortcut. Do you really want to exit i3? This will end your X session.' -B 'Yes, exit i3' 'i3-msg exit'"

# resize window (you can also use the mouse for that)
mode "resize" {
        # These bindings trigger as soon as you enter the resize mode

        # Pressing left will shrink the window’s width.
        # Pressing right will grow the window’s width.
        # Pressing up will shrink the window’s height.
        # Pressing down will grow the window’s height.
        bindsym Left resize shrink width 10 px or 10 ppt
        bindsym Down resize grow height 10 px or 10 ppt
        bindsym Up resize shrink height 10 px or 10 ppt
        bindsym Right resize grow width 10 px or 10 ppt

        # back to normal: Enter or Escape or $mod+r
        bindsym Return mode "default"
        bindsym Escape mode "default"
        bindsym $mod+r mode "default"
}

bindsym $mod+r mode "resize"

# Start i3bar to display a workspace bar
bar {
#         status_command i3status
	status_command /home/hax/.cargo/bin/i3status-rs /home/hax/.config/i3/status.toml
	height 20
}

# Background image
exec --no-startup-id feh --bg-scale /home/hax/Desktop/FullArtEriko.png
#exec --no-startup-id feh --bg-scale ~/Nier-Automata-Rice/resources/WallpaperSmall.png
#exec --no-startup-id ~/Nier-Automata-Rice/scripts/run.sh

# Lock screen
bindsym $mod+x exec --no-startup-id i3lock-fancy -p

# Language
exec_always "setxkbmap -option 'grp:alt_shift_toggle' -layout 'us,bg' -variant ',phonetic'"

# Screenshots
bindsym --release $mod+Print exec gnome-screenshot -a
bindsym Print exec gnome-screenshot -i

# Applications
bindsym $mod+F1 exec firefox

# Gaps
gaps inner 6
gaps outer 6

#for_window [class="^.*"] border pixel 4
#for_window [class="^.*"] border pixel 0
#for_window [title="feh.*blured.png"] floating enable
#for_window [title="conky*"] floating enable

 */
}
